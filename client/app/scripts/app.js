/*jshint unused: vars */
define(['app.common', 'mainRoute', 'jquery'], 
  function (angularAMD, routes, $) {
    'use strict';

    // Setup dependencies for the main application angular module....
    var appDeps = ['ui.router', 'directives', 'filters', 'services', 'mocks', 'models', 'localization', 
        'mgcrea.ngStrap', 'ngStorage', 'rt.select2'];

    /**
     * @ngdoc overview
     *
     * Main module of the application.
     */
    var app = 
        angular.module('mainApp', appDeps)
        // Config
        .config(routes)
        .run(['$rootScope', '$urlRouter', '$location', '$state', '$sessionStorage',
            function($rootScope, $urlRouter, $location, $state, $sessionStorage){
                // Store the current url path to navigate to it immediately....
                $sessionStorage.routePath = $location.path();

                $rootScope.isRouting = true;

                // Resize handling....
                $rootScope.resize = function() {
                    // TODO
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
