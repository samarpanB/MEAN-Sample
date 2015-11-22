define(['angular'], function () {
  'use strict';

    return ['$scope', '$element', function (scope, $element) {
        scope.formSubmit = function() {
            var formSerialized = $element.find('#form').serialize();
            scope.onFormSubmit({formValues: formSerialized});
        };

        // Garbage collect 
        scope.$on('$destroy', function() {
            
        });
    }];
});