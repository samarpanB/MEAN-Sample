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
            controllerUrl: 'modules/login/loginController',
            onEnter: ['$localStorage', function($localStorage){
                $localStorage.$reset();
            }]
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
            controllerUrl: 'modules/main/appController'
        }));
    }]);
});