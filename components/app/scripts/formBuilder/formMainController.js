define(['angular'], function () {
  'use strict';

    return ['$scope', '$element', 'formUtils', 'formDefaultValidationMessages', 
        function (scope, $element, formUtils, formDefaultValidationMessages) {
            var _watchers = [];

            function cleanErrors() {
                angular.forEach(scope.formItems, function (item) {
                    item.errorMsg = null;
                });
            }

            scope.formSubmit = function() {
                var formSerialized = $element.find('#form').serializeArray();
                formSerialized = formUtils.normalizeFormValues(formSerialized);
                scope.onFormSubmit({formValues: formSerialized});
            };

            scope.formSubmitCancel = function() {
                scope.onFormSubmitCancel();
            };

            _watchers.push(scope.$watch(function() {
                return scope.form.$error;
            }, function (n, o){
                if((scope.form.$dirty || scope.form.$submitted) && n !== o) {
                    cleanErrors();

                    angular.forEach(n, function (err, key) {
                        angular.forEach(err, function (field) {
                            var formItem = formUtils.getFormItemByName(field.$name, scope.formItems);
                            formItem.errorMsg = formItem.errorMsg ||
                                formItem.validations[key].message ||
                                formDefaultValidationMessages[key];
                        });
                    });
                }
            }, true));

            // Garbage collect
            scope.$on('$destroy', function() {

            });
        }
    ];
});
