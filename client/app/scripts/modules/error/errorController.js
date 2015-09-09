define(['app'], function () {
  'use strict';

    return ['$scope', '$state', '$stateParams', 'constants',
    function ($scope, $state, $stateParams, Constants) {
        $scope.message = '';
        if(Constants.errorCodes.hasOwnProperty($stateParams.code))
        {
            $scope.message = Constants.errorCodes[$stateParams.code];
        }

        $scope.back = function() {
            $state.go('main.login', {}, {reload: true});
        };
    }];
});
