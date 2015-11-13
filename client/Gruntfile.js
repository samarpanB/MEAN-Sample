// Gruntfile

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('logfile-grunt')(grunt, { clearLogFile: true });

  /**
   * Define Configuration Variables.
   * 
   */
  var gruntConfig = grunt.file.readJSON('Gruntconfig.json');

  // Grunt Config
  grunt.initConfig({

    cvars: gruntConfig.configVars,
    bower: {
      setup: {
        options: { install: true, copy: false }
      }
    },
    copy: {
      setup: {
        files: [
          // External libraries installed through bower
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appjs %>/ext/',
            src: gruntConfig.bowerFiles
          },
          // Images
          {
            cwd: '<%= cvars.app %>/<%= cvars.appstyles %>/custom/img', expand: true,
            dest: '<%= cvars.app %>/<%= cvars.appstyles %>/img/',
            src: ["**"]
          },
          // Css Images 
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appstyles %>/css/',
            src: gruntConfig.cssImages
          },
          // CSS Fonts
          {
            expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appstyles %>/fonts/',
            src: gruntConfig.cssFonts
          },
          // CSS Fonts 2
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appstyles %>/css/fonts/',
            src: gruntConfig.cssFonts2
          }
        ]
      },
      build: {
        files: [
          {
            cwd: '<%= cvars.app %>/', expand: true,
            dest: '<%= cvars.build %>/',
            src: gruntConfig.buildFiles
          }
        ]
      },
      deploy: {
        files: [
          {
            cwd: '<%= cvars.build %>/', expand: true,
            dest: '<%= cvars.dist %>/',
            src: gruntConfig.deployFiles

          }
        ]
      }
    },
    cleanempty: {
      options: {
        files: false,
        folders: true,
        force: true
      },
      setup: {
        src: [
          '<%= cvars.app %>/<%= cvars.appstyles %>/**'
        ]
      },
      deploy: {
        src: [
          '<%= cvars.dist %>/**'
        ]
      }
    },
    clean: {
      options: { force: true },
      build: ['<%= cvars.build %>'],
      'post-requirejs': ['<%= cvars.build %>/<%= cvars.appjs %>/ext'],
      deploy: [
        '<%= cvars.dist %>/*'
      ],
      setup: {
        src: [
          '<%= cvars.app %>/<%= cvars.appjs %>/ext/*.js',
          '<%= cvars.app %>/<%= cvars.appstyles %>/css/**',
          '<%= cvars.app %>/<%= cvars.appstyles %>/fonts/**',
          '<%= cvars.app %>/<%= cvars.appstyles %>/img/**',
          '!<%= cvars.app %>/<%= cvars.appjs %>/ext/edited/**'
        ]
      }
    },
    cssmin: {
      setup: {
        files: {
          '<%= cvars.app %>/<%= cvars.appstyles %>/css/external.min.css': gruntConfig.cssExtFiles,
          '<%= cvars.app %>/<%= cvars.appstyles %>/css/styles.min.css': gruntConfig.cssFiles
        }
      }
    },
    preprocess: {
      build: {
        src : '<%= cvars.app %>/index.html',
        dest : '<%= cvars.build %>/index.build.html'
      }
    },
    htmlmin: {
      // See https://github.com/yeoman/grunt-usemin/issues/44 for using 2 passes
      build: {
        options: {
          removeComments: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          // Cannot remove empty elements with angular directives
          removeEmptyElements: false,
          collapseWhitespace: true
        },
        files: [
          { '<%= cvars.build %>/index.html': '<%= cvars.build %>/index.build.html' }
        ]
      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: '<%= cvars.app %>/<%= cvars.appjs %>',
          mainConfigFile: '<%= cvars.app %>/<%= cvars.appjs %>/main.js',
          removeCombined: true,
          // findNestedDependencies: true,
          // optimize: 'none',
          skipDirOptimize: true,
          dir: '<%= cvars.build %>/<%= cvars.appjs %>/',
          modules: [
            { 
              name: 'app',
              excludeShallow: ['config']
            },
            {
              name: 'modules/main/mainController',
              exclude: ['config', 'app.common']
            }
          ]
        }
      },
      buildUnoptimized: {
        options: {
          baseUrl: '<%= cvars.app %>/<%= cvars.appjs %>',
          mainConfigFile: '<%= cvars.app %>/<%= cvars.appjs %>/main.js',
          removeCombined: true,
          // findNestedDependencies: true,
          optimize: 'none',
          skipDirOptimize: true,
          dir: '<%= cvars.build %>/<%= cvars.appjs %>/',
          modules: [
            { 
              name: 'app',
              excludeShallow: ['config']
            },
            {
              name: 'modules/main/mainController',
              exclude: ['config', 'app.common']
            }
          ]
        }
      }
    },
    jshint: {
      build: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            '<%= cvars.app %>/<%= cvars.appjs %>/**/*.js'
          ]
        }
      }
    },

    connect: {
      server: {
        // livereload: true,
        options: {
          port: gruntConfig.configVars.devport,
          keepalive: true,
          base: '<%= cvars.app %>',
          middleware: function (connect, options) {
            var middlewares = [];
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            options.base.forEach(function (base) {
               // Serve static files.
               middlewares.push(connect.static(base));
            });
            middlewares.push(proxy);
            return middlewares;
          }
        },
        proxies: [
            {
                context: '/api',
                host: 'localhost',
                port: 3000,
                https: false,
                xforward: false,
                rewrite: {
                    '/api': '/api'
                }
            }
        ]
      },
      deploy: {
        // livereload: true,
        options: {
          port: gruntConfig.configVars.port,
          keepalive: true,
          base: '<%= cvars.dist %>',
          middleware: function (connect, options) {
            var middlewares = [];
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            options.base.forEach(function (base) {
               // Serve static files.
               middlewares.push(connect.static(base));
            });
            middlewares.push(proxy);
            return middlewares;
          }
        },
        proxies: [
          {
              context: '/api',
              host: 'localhost',
              port: 3000,
              https: false,
              xforward: false,
              rewrite: {
                '/api': '/api'
              }
          }
        ]
      }
    },
    compress: {
      zip: {
        options: {
          archive: 'build.zip'
        },
        files: [
          {expand: true, cwd:'dist', src: ['**'], dest:''}
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
      buildTest: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  /**
   * setup task
   * Run the initial setup, sourcing all needed upstream dependencies
   */
  grunt.registerTask('setup', ['bower:setup', 'clean:setup', 'copy:setup', 'cssmin:setup', 'cleanempty:setup']);

  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('build', [
    'jshint:build',
    'clean:build',
    'preprocess:build',
    'htmlmin:build',
    'requirejs:build',
    'clean:post-requirejs',
    'copy:build'
  ]);


  /**
   * Release task
   * Deploy to dist directory
   */
  grunt.registerTask('release', [
    'build',
    'clean:deploy',
    'copy:deploy',
    'cleanempty:deploy',
    'compress:zip'
  ]);

  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('buildUO', [
    'jshint:build',
    'clean:build',
    'preprocess:build',
    'htmlmin:build',
    'requirejs:buildUnoptimized',
    'clean:post-requirejs',
    'copy:build'
  ]);


  /**
   * Release task
   * Deploy to dist directory
   */
  grunt.registerTask('releaseUO', [
    'buildUO',
    'clean:deploy',
    'copy:deploy',
    'cleanempty:deploy',
    'compress:zip'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  /**
   * development task
   * Launch webserver and watch for changes
   */
  grunt.registerTask('dev', [
    'build', 'configureProxies:server',/* 'testCases',*/ 'connect:server'
  ]);

  grunt.registerTask('deploy', [
    'release', 'configureProxies:deploy', 'connect:deploy'
  ]);

  grunt.registerTask('deployUO', [
    'releaseUO', 'configureProxies:deploy', 'connect:deploy'
  ]);

  grunt.registerTask('default', ['release']);
  
  // prevent grunt from aborting if test cases fail.
  grunt.registerTask('forceStart', 'Force Start', function() {
    grunt.option('force', true);
  });
  grunt.registerTask('forceStop', 'Force Stop', function() {
    grunt.option('force', false);
  });
  grunt.registerTask('testCases', ['forceStart','karma:buildTest','forceStop']);
};
