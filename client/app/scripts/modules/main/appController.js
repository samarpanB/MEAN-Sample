define(['app', 'angular',
    'modules/main/appTemplates', 
    'modules/home/homeController',
    'modules/clients/clientController'], 
    function () {
    'use strict';

    /**
    * @ngdoc function
    * @name advertisingApp.controller:AppCtrl
    * @description
    * # AppCtrl
    * Controller of the login module
    */
    return ['$scope','$state', 'sessionService', 'globals',
	function ($scope, $state, SessionService, globals) {

        $scope.isLoading = true;
        $scope.user = globals.loggedInUser;
        $scope.user.fetch().then(function(){
            $scope.isLoading = false;
        });

        $scope.logout = function(){
            SessionService.logout().then(function(){
                // After success, do the following
                $scope.user = globals.loggedInUser = null;
                $state.go('main.login');
            });
        };
	}];
});
