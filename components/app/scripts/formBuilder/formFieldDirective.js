define(['jquery', 'formBuilder/formFieldController', 'text!formBuilder/formField.html'], 
    function ($, formFieldCtrl, tmpl) {
    'use strict';

    return [function () {
        return {
            restrict: 'E',
            scope: {
                formItemDetail: '='
            },
            template: tmpl,
            controller: formFieldCtrl
        };
    }];
});