define(['angularAMD', 'tmplRegister', 'tmplKeys',
    'text!modules/home/homeView.html'
    ], 
    function (angularAMD, tmplRegister, tmplKeys, homeView) {
        'use strict';
        angularAMD.service('appTemplates', function(){
            tmplRegister.register(tmplKeys.Home, homeView);
        });
});
