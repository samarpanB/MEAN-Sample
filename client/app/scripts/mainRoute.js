define(['angularAMD', 'config', 'text!modules/main/mainView.html', 'common/app.interceptor'], 
    function(angularAMD, Config, mainView, interceptor) {
    'use strict';
    return ['$stateProvider','$urlRouterProvider', '$httpProvider', 
        function ($stateProvider,$urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/'); // Need to revisit later....

        if(Config.mode !== 'test')
        {
            // Add interceptor
            $httpProvider.interceptors.push(interceptor);
        }

        $stateProvider
        .state('main', angularAMD.route({
            url: '/',
            template: mainView,
            controllerUrl: 'modules/main/mainController',
            params: {
                loginSuccess: false
            },
            onEnter: ['$state', '$stateParams', 'globals', 'userModel', '$location', 'sessionService', '$sessionStorage', 
                'localize', '$locale', '$localStorage',
                function($state, $stateParams, globals, userModel, $location, SessionService, $sessionStorage, 
                    localize, $locale, $localStorage) {
                    return localize.setLanguage($locale.id).then(function(){
                        // Do session check here....
                        return SessionService.refresh($sessionStorage.advRefreshToken).then(
                            function() {
                                if($localStorage.itRememberMe || $stateParams.loginSuccess) {
                                    // If success....
                                    globals.loggedInUser = userModel.init();
                                    return globals.loggedInUser.fetch(true, 1).then(function(){
                                        // Now go to correct location....
                                        if($location.path() === '/') {
                                           $state.go('main.app.home');
                                        }
                                        return true;
                                    }, function(){
                                        $state.go('main.login');
                                        return false;
                                    });
                                }
                                else {
                                    $state.go('main.login');
                                    return false;
                                }
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