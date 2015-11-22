define(['jquery', 'text!formBuilder/formMain.html', 'formBuilder/formMainController'], 
    function ($, formTmpl, formMainCtrl) {
    'use strict';

    return ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'E',
            scope: {
                formConfig: '=',
                formItems: '=',
                onFormSubmit: '&'
            },
            template: formTmpl,
            controller: formMainCtrl,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transcludeFn) {
                transcludeFn(scope, function(transEl) {
                    debugger;

                    var transEl = $(el).clone();
                        formItem = $(transEl).find("form-item"),
                        formLbl = $(transEl).find("[form-label]"),
                        formField = $(transEl).find("form-field"),
                        compiledTransEl;
                    formItem.attr({
                        'ng-repeat': "item in formItems"
                    });
                    formLbl.attr({
                        'ng-bind': 'item.label'
                    });
                    formField.attr({
                        'form-item-detail': 'item'
                    });
                    
                    compiledTransEl = $compile(transEl)(scope);
                    $timeout(function() {
                        element.find("#form").append(compiledTransEl);
                    });
                });
            }
        };
    }];
});