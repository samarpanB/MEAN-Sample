define(['angularAMD', 'tmplRegister', 'tmplKeys',
    'text!modules/login/loginView.html',
    'text!modules/error/errorView.html',
    'text!modules/main/appView.html'
    ], 
    function (angularAMD, tmplRegister, tmplKeys, loginView, errorView, appView) {
        'use strict';
        angularAMD.service('mainTmpls', function(){
            tmplRegister.register(tmplKeys.Login, loginView);
            tmplRegister.register(tmplKeys.Error, errorView);
            tmplRegister.register(tmplKeys.AppMain, appView);
        });
});
