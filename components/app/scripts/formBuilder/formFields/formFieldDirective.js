define(['jquery', 'formBuilder/formFields/formFieldController'],
    function ($, formFieldCtrl) {
    'use strict';

    return ['$compile',
        function ($compile) {
            return {
                restrict: 'E',
                require: '?^^dynamicForm',
                scope: {
                    type: '@',
                    field: '=',
                    value: '='
                },
                controller: formFieldCtrl,
                link: function(scope, el, attrs, formCtrl) {
                    if(!formCtrl) {
                        return;
                    }

                    var tmpl = scope.field && scope.type && (scope.field.template ||
                        formCtrl.fbTmplInstance.getTemplate(scope.type));
                    if(tmpl) {
                        tmpl = $(el).append(tmpl);
                        $compile(tmpl)(scope);
                    }
                }
            };
        }
    ];
});
