define(['angularAMD', 'tmplRegister'], 
    function(angularAMD, tmplRegister) {
    'use strict';
    return angularAMD.config(['$stateProvider', 'constants', 
        function ($stateProvider, constants) {

        $stateProvider
        .state('main.app.clients.save', angularAMD.route({
            url: '^/clients/{id}',
            params: {
                echoParams: null,
                backState: null
            },
            resolve: {
                tmplLoaded: ['clientTemplates', function(){
                    return true;
                }],
                clientModel: ['clientModel', function(clientModel){
                    clientModel.destroy();
                    clientModel.init();
                    return clientModel;
                }]
            },
            views: {
                'pageContent': angularAMD.route({
                    templateProvider: function(){
                        return tmplRegister.getTemplate(constants.TemplateKeys.ClientForm);
                    },
                    controller: 'ClientSaveCtrl',
                    controllerUrl: 'modules/clients/save/clientSaveController'                    
                })
            }
        }))
        .state('main.app.clients.list', angularAMD.route({
            url: '^/clients',
            resolve: {
                tmplLoaded: ['clientTemplates', function(){
                    return true;
                }],
                clientsModel: ['clientsModel', function(clientsModel){
                    clientsModel.destroy();
                    clientsModel.init();
                    return clientsModel;
                }]
            },
            views: {
                'pageContent': angularAMD.route({
                    templateProvider: function(){
                        return tmplRegister.getTemplate(constants.TemplateKeys.ClientsList);
                    },
                    controller: 'ClientsListCtrl',
                    controllerUrl: 'modules/clients/list/clientsListController'                   
                })
            }
        }));
    }]);
});