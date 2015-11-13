define(['angularAMD', 'tmplRegister'], 
    function(angularAMD, tmplRegister) {
    'use strict';
    return angularAMD.config(['$stateProvider', 'constants', 
        function ($stateProvider, constants) {

        $stateProvider
        .state('main.login', angularAMD.route({
            url: '^/login',
            templateProvider: function(){
                return tmplRegister.getTemplate(constants.TemplateKeys.Login);
            },
            controllerUrl: 'modules/login/loginController'/*,
            onEnter: ['$localStorage', function($localStorage){
                $localStorage.$reset();
            }]*/
        }))
        .state('main.error', angularAMD.route({
            url: '^/error/{code:int}',
            templateProvider: function(){
                return tmplRegister.getTemplate(constants.TemplateKeys.Error);
            },
            controllerUrl: 'modules/error/errorController'
        }))
        .state('main.app', angularAMD.route({
            templateProvider: function(){
                return tmplRegister.getTemplate(constants.TemplateKeys.AppMain);
            },
            resolve: {
                loggedInUser: ['globals', '$q', '$interval', function(globals, $q, $interval) {
                    var defer = $q.defer(), repeater;
                    if(globals.loggedInUser) {
                        defer.resolve(globals.loggedInUser);
                    }
                    else {
                        repeater = $interval(function() {
                            if(globals.loggedInUser) {
                                defer.resolve(globals.loggedInUser);
                                $interval.cancel(repeater);
                            }
                        }, 500);
                    }
                    return defer.promise;
                }]
            },
            controllerUrl: 'modules/main/appController'
        }));
    }]);
});