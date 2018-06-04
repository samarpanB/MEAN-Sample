/*jshint unused: vars */
define(['app.common', 'mainRoute', 'jquery'], 
  function (angularAMD, routes, $) {
    'use strict';

    // Setup dependencies for the main application angular module....
    appDeps = ['ui.router', 'directives', 'filters', 'services', 'mocks', 'models', 'localization', 
        'mgcrea.ngStrap', 'ngStorage', 'rt.select2', 'datatables', 'datatables.bootstrap', 'ngTagsInput',
        'components'];

    /**
     * @ngdoc overview
     *
     * Main module of the application.
     */
    app = 
        angular.module('mainApp', appDeps)
        // Config
        .config(routes)
        .run(['$rootScope', '$urlRouter', '$location', '$state', '$sessionStorage', 'globals', 'userModel',
            function($rootScope, $urlRouter, $location, $state, $sessionStorage, globals, userModel){
                // Store the current url path to navigate to it immediately....
                $sessionStorage.routePath = $location.path();

                $rootScope.isRouting = true;
                // globals.loggedInUser = userModel.init();

                // Resize handling....
                $rootScope.resize = function() {
                    var content = $('.page-content');
                    var sidebar = $('.page-sidebar');

                    if (!content.attr("data-height")) {
                        content.attr("data-height", content.height());
                    }

                    if (sidebar.height() > content.height()) {
                        content.css("min-height", sidebar.height() + 120);
                    } else {
                        content.css("min-height", content.attr("data-height"));
                    }
                };
                $(window).on('resize', function(e){
                    $rootScope.resize();
                });
                
                // Location change success event handler
                $rootScope.$on('$locationChangeSuccess', function(e) {
                    $rootScope.isRouting = false;
                });

                // Location change start event handler
                $rootScope.$on('$locationChangeStart', function(e) {
                    $rootScope.isRouting = true;
                });

                $rootScope.$on('$stateChangeSuccess', function() {
                    if($sessionStorage.routePath) {
                        $location.path($sessionStorage.routePath);
                        $sessionStorage.routePath = null;
                    }
                });
        }]);

    // Bootstrap app to view
    return angularAMD.bootstrap(app);
});
