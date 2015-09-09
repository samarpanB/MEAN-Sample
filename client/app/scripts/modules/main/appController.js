define(['app', 'angular',
    'modules/main/appTemplates', 
    'modules/home/homeController'], 
    function () {
    'use strict';

    /**
    * @ngdoc function
    * @name advertisingApp.controller:AppCtrl
    * @description
    * # AppCtrl
    * Controller of the login module
    */
    return ['$scope','$state',
	function () {

        // $scope.isLoading = true;
        // $scope.user = globals.loggedInUser;
        // $scope.user.fetch(false).then(function(){
        //     $scope.isLoading = false;
        // });

        // $scope.logout = function(){
        //     // Do logout. 
        //     // ToDo
        //     // After success, do the following
        // 	$scope.user = globals.loggedInUser = null;
        //     $state.go('main.login');
        // };
	}];
});
