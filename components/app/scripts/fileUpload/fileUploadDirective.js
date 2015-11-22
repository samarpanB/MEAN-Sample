define(['jquery'], function ($) {
  'use strict';

return ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var filesChangeCallback = attrs.onFilesChange ? $parse(attrs.onFilesChange) : null;
                var modelSetter = model.assign;

                $(element).on('change.fileUpload', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files);
                    });
                    if(filesChangeCallback && angular.isFunction(filesChangeCallback(scope))) {
                        filesChangeCallback(scope)(model(scope));
                    }
                });

                // Garbage collect 
                scope.$on('$destroy', function() {
                    $(element).off("change.fileUpload");
                });
            }
        };
    }];
});