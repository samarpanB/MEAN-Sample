define(['angular'], function () {
  'use strict';

    return ['$scope', function (scope) {
        // Garbage collect
        scope.$on('$destroy', function() {

        });
    }];
});
