define(['angular'], function () {
  'use strict';

    return ['$scope', '$state', 'sessionService', '$sessionStorage', '$localStorage',
        function ($scope, $state, SessionService, $sessionStorage, $localStorage) {
            $scope.loginProcessing = true;
            $scope.loginModel = {
                userName : '',
                password : '',
                rememberMe : false
            };

            $scope.login = function(userName, password){
                if($scope.loginForm.$error.required && $scope.loginForm.$error.required.length > 0){
                    return true;
                }
                $scope.loginProcessing = true;
                SessionService.login(userName, password).then(function() {
                    if($scope.loginModel.rememberMe) {
                        $localStorage.demoRememberMe = $sessionStorage.demoRefreshToken;
                    }
                    $state.go('main', {loginSuccess: true}, {reload: true});
                },function() {
                    $scope.loginProcessing = false;
                });
            };

            SessionService.refresh($sessionStorage.demoRefreshToken).then(
	            function() {
	                $state.go('main', {loginSuccess: true}, {reload: true});     
	                return true;
	            },
	            function() {
	                $scope.loginProcessing = false;
	            }
	        );   
        }];
});
