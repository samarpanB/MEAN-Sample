define(['angular'], function () {
  'use strict';

    return ['$scope', '$element', 'formUtils', 'formDefaultValidationMessages',
        'formFieldTemplateService',
        function (scope, $element, formUtils, formDefaultValidationMessages,
            formFieldTemplateService) {
            var _watcherRemovers = [];

            function cleanErrors(formItems) {
                angular.forEach(formItems, function (item) {
                    item.errorMsg = null;
                });
            }

            function calculateErrors(errObj, formItems, defaultMsgs) {
                cleanErrors(formItems);

                angular.forEach(errObj, function (err, key) {
                    angular.forEach(err, function (field) {
                        var formItem = formUtils.getFormItemByName(field.$name, scope.formItems);
                        formItem.errorMsg = formItem.errorMsg ||
                            (formItem.validations && formItem.validations.hasOwnProperty(key) &&
                                formItem.validations[key].message) ||
                            defaultMsgs[key];
                    });
                });
            }

            this.fbTmplInstance = scope.fbTmplInstance = formFieldTemplateService.init();

            scope.formSubmit = function() {
                if(scope.form.$invalid) {
                    return;
                }

                var formSerialized = $element.find('#form').serializeArray();
                formSerialized = formUtils.normalizeFormValues(formSerialized);
                scope.onFormSubmit({formValues: formSerialized});
            };

            scope.formSubmitCancel = function() {
                scope.onFormSubmitCancel();
            };

            scope.removeItem = function(index) {
                scope.formItems.splice(index, 1);
            };

            if (scope.fbDefaults && scope.fbDefaults.defaultValidationMessages) {
                angular.value("formDefaultValidationMessages",
                    angular.merge(formDefaultValidationMessages,
                        scope.fbDefaults.defaultValidationMessages));
            }

            _watcherRemovers.push(scope.$watch(function(sc) {
                return sc.form.$error;
            }, function (n, o){
                if((scope.form.$dirty || scope.form.$submitted) && n !== o) {
                    calculateErrors(n, scope.formItems, formDefaultValidationMessages);
                }
            }, true));

            _watcherRemovers.push(scope.$watch(function(sc) {
                return sc.form.$dirty;
            }, function (n, o){
                if((n || scope.form.$submitted) && n !== o) {
                    calculateErrors(scope.form.$error, scope.formItems, formDefaultValidationMessages);
                }
            }, true));

            _watcherRemovers.push(scope.$watch(function(sc) {
                return sc.form.$submitted;
            }, function (n, o){
                if((n || scope.form.$dirty) && n !== o) {
                    calculateErrors(scope.form.$error, scope.formItems, formDefaultValidationMessages);
                }
            }, true));

            // Garbage collect
            scope.$on('$destroy', function() {
                angular.forEach(_watcherRemovers, function(val) {
                    val();
                });
            });
        }
    ];
});
