define(['angularAMD', 'angular', 'config', 'text!modules/main/mainView.html', 'common/app.interceptor'],
    function(angularAMD, angular, Config, mainView, interceptor) {
    'use strict';
    return ['$stateProvider','$urlRouterProvider', '$httpProvider', '$datepickerProvider',
        '$timepickerProvider', 'formFieldTemplateServiceProvider',
        function ($stateProvider,$urlRouterProvider, $httpProvider, $datepickerProvider,
            $timepickerProvider, formFieldTemplateServiceProvider) {

        $urlRouterProvider.otherwise('/');

        // formFieldTemplateServiceProvider.templates = {
        //     multiSelect: "<select2 ng-class='field.css' name='{{field.name}}' multiple='true'" +
        //         "ng-model='value' ng-required='field.validations.required.value' " +
        //         "s2-options='option as option for option in field.dataSource'>" +
        //     "</select2>"
        // };

        if(Config.mode !== 'test')
        {
            // Add interceptor
            $httpProvider.interceptors.push(interceptor);
        }

        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd/MM/yyyy',
            autoclose: true
        });

        angular.extend($timepickerProvider.defaults, {
            timeFormat: 'HH:mm',
            autoclose: true
        });

        $stateProvider
        .state('main', angularAMD.route({
            url: '/',
            template: mainView,
            controllerUrl: 'modules/main/mainController',
            params: {
                loginSuccess: false
            },
            onEnter: ['$state', '$timeout', '$stateParams', 'globals', 'userModel', '$location', 'sessionService',
                '$sessionStorage', 'localize', '$locale', '$localStorage',
                function($state, $timeout , $stateParams, globals, userModel, $location, SessionService,
                    $sessionStorage, localize, $locale, $localStorage) {
                    return localize.setLanguage($locale.id).then(function(){
                        // Do session check here....
                        return SessionService.refresh($sessionStorage.demoRefreshToken || $localStorage.demoRememberMe).then(
                            function() {
                                // If success....
                                globals.loggedInUser = userModel.init();
                                return globals.loggedInUser.fetch().then(function(){
                                    // Now go to correct location....
                                    if($location.path() === '/') {
                                       $state.go('main.app.home');
                                    }
                                    return true;
                                }, function(){
                                    $state.go('main.login');
                                    return false;
                                });
                            },
                            function() {
                                $state.go('main.login');
                                return false;
                            }
                        );
                    },
                    function() {
                        $state.go('main.error', {code: 1});
                        return false;
                    });
                }
            ]
        }));
    }];
});
