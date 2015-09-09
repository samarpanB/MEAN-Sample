define([], 
    function () {
        'use strict';
        var tmplRegister = {};
        return {
            register: function(key, val){
                if(key) {
                   tmplRegister[key] = val; 
               }
            },

            unregister: function(key){
                if(key && tmplRegister.hasOwnProperty(key)) {
                    tmplRegister[key] = null;
                    delete tmplRegister[key];
                }
            },

            getTemplate: function(key){
                return tmplRegister[key] || null;
            }
        };
});