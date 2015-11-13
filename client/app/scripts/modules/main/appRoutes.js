define(['angularAMD', 'tmplRegister'], 
    function(angularAMD, tmplRegister) {
    'use strict';
    return angularAMD.config(['$stateProvider', 'constants', function ($stateProvider, constants) {

        $stateProvider
        .state('main.app.home', {
            url: '^/home',
            resolve: {
                tmplLoaded: ['appTemplates', function(){
                    return true;
                }]
            },
            views: {
                'content': angularAMD.route({
                    templateProvider: function(){
                        return tmplRegister.getTemplate(constants.TemplateKeys.Home);
                    },
                    controller: "HomeCtrl",
                    controllerUrl: 'modules/home/homeController'                    
                })
            }
        })
        .state('main.app.clients', {
            resolve: {
                tmplLoaded: ['appTemplates', function(){
                    return true;
                }]
            },
            views: {
                'content': angularAMD.route({
                    templateProvider: function(){
                        return tmplRegister.getTemplate(constants.TemplateKeys.Clients);
                    },
                    controller: "ClientCtrl",
                    controllerUrl: 'modules/clients/clientController'                    
                })
            }
        });
    }]);
});