define(['jquery', 'text!formBuilder/formMain.html', 'formBuilder/formMainController'],
    function ($, formTmpl, formMainCtrl) {
    'use strict';

    return ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                formConfig: '=',
                formItems: '=',
                onFormSubmit: '&',
                onFormSubmitCancel: '&'
            },
            template: formTmpl,
            controller: formMainCtrl,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transcludeFn) {
                transcludeFn(scope, function(el) {
                    var transEl = $(el).clone(),
                        formItem = $(transEl).find("form-item"),
                        formLbl = formItem.find("[form-label]"),
                        formField = formItem.find("form-field"),
                        // formSubmit = $(transEl).find("[form-submit]"),
                        formSubmitCancel = $(transEl).find("[form-submit-cancel]"),
                        compiledTransEl;
                    formItem.attr({
                        'ng-repeat': "item in formItems"
                    });
                    formLbl.attr({
                        'ng-bind': 'item.label'
                    });
                    formField.attr({
                        'field': 'item',
                        'type': '{{item.type}}',
                    });
                    formSubmitCancel.attr({
                        'ng-click': 'formSubmitCancel()'
                    });

                    compiledTransEl = $compile(transEl)(scope);
                    element.find("#form").append(compiledTransEl);
                });
            }
        };
    }];
});
