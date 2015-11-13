define(['angularAMD', 'tmplRegister', 'tmplKeys',
    'text!modules/home/homeView.html',
    'text!modules/clients/clientView.html'
    ], 
    function (angularAMD, tmplRegister, tmplKeys, homeView, clientsView) {
        'use strict';
        angularAMD.service('appTemplates', function(){
            tmplRegister.register(tmplKeys.Home, homeView);
            tmplRegister.register(tmplKeys.Clients, clientsView);
        });
});
