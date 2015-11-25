define(['jquery', 'formBuilder/formFields/formFieldController'],
    function ($, formFieldCtrl) {
    'use strict';

    return ['FORM_FIELD_CONSTANTS', '$compile', 'formFieldTemplateService',
        function (CONSTANTS, $compile, formFieldTemplateService) {
            return {
                restrict: 'E',
                scope: {
                    type: '@',
                    field: '=',
                    value: '='
                },
                controller: formFieldCtrl,
                link: function(scope, el) {
                    var tmpl = formFieldTemplateService.getTemplate(scope.type);
                    if(tmpl) {

                        tmpl = $(el).append(tmpl);
                        $compile(tmpl)(scope);
                    }
                }
            };
        }
    ];
});
