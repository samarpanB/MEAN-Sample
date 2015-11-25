define(['jquery', 'formBuilder/formFields/formFieldErrController'],
    function ($, formFieldErrCtrl) {
    'use strict';

    return ['FORM_FIELD_CONSTANTS', '$compile', 'formFieldTemplateService',
        function (CONSTANTS, $compile, formFieldTemplateService) {
            return {
                restrict: 'E',
                require: '^dynamicForm',
                controller: formFieldErrCtrl,
                transclude: true,
                scope: {
                    field: '='
                },
                template: "<div ng-show='form.$submitted && form[field.name].$error'/>"
                link: function(scope, element, attrs, formCtrl, transcludeFn) {
                    transcludeFn(scope, function(el) {
                        var transEl = $(el).clone(),
                            formFieldErrMsg = $(transEl).find("[form-field-error-message]"),
                            compiledTransEl;

                        formFieldErrMsg.attr({
                            'ng-bind': "field.errMsg"
                        });

                        compiledTransEl = $compile(transEl)(scope);
                        element.find("#form").append(compiledTransEl);
                    });
                }
            };
        }
    ];
});
