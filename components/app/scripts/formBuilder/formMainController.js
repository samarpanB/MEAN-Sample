define(['angular'], function () {
  'use strict';

    return ['$scope', '$element', 'formUtils', function (scope, $element, formUtils) {
        scope.formSubmit = function() {
            var formSerialized = $element.find('#form').serializeArray();
            formSerialized = formUtils.normalizeFormValues(formSerialized);
            scope.onFormSubmit({formValues: formSerialized});
        };

        scope.formSubmitCancel = function() {
            scope.onFormSubmitCancel();
        };

        // Garbage collect
        scope.$on('$destroy', function() {

        });
    }];
});
