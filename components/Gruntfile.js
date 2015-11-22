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
          }
          // // Images
          // {
          //   cwd: '<%= cvars.app %>/<%= cvars.appstyles %>/custom/img', expand: true,
          //   dest: '<%= cvars.app %>/<%= cvars.appstyles %>/img/',
          //   src: ["**"]
          // },
          // // Css Images 
          // {
          //   cwd: 'bower_components', expand: true, flatten: true,
          //   dest: '<%= cvars.app %>/<%= cvars.appstyles %>/css/',
          //   src: gruntConfig.cssImages
          // },
          // // CSS Fonts
          // {
          //   expand: true, flatten: true,
          //   dest: '<%= cvars.app %>/<%= cvars.appstyles %>/fonts/',
          //   src: gruntConfig.cssFonts
          // },
          // // CSS Fonts 2
          // {
          //   cwd: 'bower_components', expand: true, flatten: true,
          //   dest: '<%= cvars.app %>/<%= cvars.appstyles %>/css/fonts/',
          //   src: gruntConfig.cssFonts2
          // }
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
      }
    },
    clean: {
      options: { force: true },
      build: ['<%= cvars.build %>/*'],
      'post-requirejs': ['<%= cvars.build %>/<%= cvars.appjs %>/ext'],
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
    requirejs: {
      build: {
        options: {
          baseUrl: '<%= cvars.app %>/<%= cvars.appjs %>',
          mainConfigFile: '<%= cvars.app %>/<%= cvars.appjs %>/build.js',
          removeCombined: true,
          // findNestedDependencies: true,
          // optimize: 'none',
          skipDirOptimize: true,
          name: 'main',
          include: ['ext/tools/almond'],
          exclude: ['jquery', 'angular'],
          out: '<%= cvars.build %>/components.min.js',
          wrap: {
            "startFile": "wrap.start",
            "endFile": "wrap.end"
          }
        }
      },
      buildUnoptimized: {
        options: {
          baseUrl: '<%= cvars.app %>/<%= cvars.appjs %>',
          mainConfigFile: '<%= cvars.app %>/<%= cvars.appjs %>/build.js',
          removeCombined: true,
          // findNestedDependencies: true,
          optimize: 'none',
          skipDirOptimize: true,
          name: 'main',
          include: ['ext/tools/almond'],
          exclude: ['jquery', 'angular'],
          out: '<%= cvars.build %>/components.min.js',
          wrap: {
            "startFile": "wrap.start",
            "endFile": "wrap.end"
          }
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
    'requirejs:build',
    'clean:post-requirejs',
    'copy:build'
  ]);

  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('buildUO', [
    'jshint:build',
    'clean:build',
    'requirejs:buildUnoptimized',
    'clean:post-requirejs',
    'copy:build'
  ]);

  grunt.registerTask('default', ['build']);
  
};
