define(['angularAMD', 'tmplRegister', 'tmplKeys',
    'text!modules/clients/save/clientFormView.html',
    'text!modules/clients/list/clientsListView.html'
    ], 
    function (angularAMD, tmplRegister, tmplKeys, clientFormView, clientsListView) {
        'use strict';
        angularAMD.service('clientTemplates', function(){
            tmplRegister.register(tmplKeys.ClientForm, clientFormView);
            tmplRegister.register(tmplKeys.ClientsList, clientsListView);
        });
});
