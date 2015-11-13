define(['app', 'underscore', 'bootbox', 'common/constants/maritalStatus', 
	'common/constants/clientType'], 
    function (app, _, bootbox, MaritalStatus, ClientType) {
    'use strict';

        app.controller('ClientSaveCtrl', ['$scope', '$state', '$stateParams', 'clientModel', 'utils', 
        	'constants', '$q', '$timeout', 'systemDataService', 'globals',
            function ($scope, $state, $stateParams, clientModel, utils, constants, $q, $timeout, systemDataService,
            	globals) {
	            
	            var init = function() {
	            	$scope.getReqdData().then(function(){
	            		// Setup mode for view
			            if($stateParams.id === "0") {
			            	$scope.createNew();
			            }
			            else {
			            	$scope.open($stateParams.id);
			            }
	            	});
	            };
            	
            	$scope.isLoading = false;
	            $scope.model = clientModel.get();
	            $scope.mode = 'new';
	            $scope.clientTypes = _.values(ClientType);
	            $scope.maritalStatuses = _.values(MaritalStatus);
	            $scope.systemData = globals.systemData;
	            $scope.password = ""; 
                $scope.assetFile = null;

	            $scope.open = function(clientId) {
	            	$scope.isLoading = true;
            		$scope.model.fetch(true, clientId).then(function(){
            			$scope.isLoading = false;
            		}, function(){
                        $scope.isLoading = false;
                    });
	                $scope.mode = 'edit';
	            };

	            $scope.createNew = function() {
	                $scope.model.clear();
	                
	                // Set default country as India
	                var defCountry = _.findWhere($scope.systemData.countries, {name: "India"});
	                $scope.model.data.address.country = defCountry ? defCountry._id : "";

	                $scope.mode = 'new'; 
	                $scope.assetFile = null;
	            };

	            $scope.saveNew = function() {
	            	$scope.isLoading = true;
	            	// $scope.model.data.user = {
	            	// 	username: $scope.model.data.mobile,
	            	// 	password: $scope.password
	            	// };
	                $scope.model.save($scope.model.data, $scope.assetFile).then(function(r){
	                	if($stateParams.backState) {
	                		var params = $stateParams.echoParams || {};
	                		params.clientId = r._id;
	                		$state.go($stateParams.backState, params);
	                	}
	                	else {
		                    $state.go("^.list");
	                	}
	                    $scope.isLoading = false;
	                }, function(){
                        $scope.isLoading = false;
                    });
	            };

	            $scope.update = function() {
	            	$scope.isLoading = true;
	            	$scope.model.update($scope.model.data, $scope.assetFile).then(function(r){
	                    if($stateParams.backState) {
	                		var params = $stateParams.echoParams || {};
	                		params.clientId = r._id;
	                		$state.go($stateParams.backState, params);
	                	}
	                	else {
		                    $state.go("^.list");
	                	}
	                    $scope.isLoading = false;
	                }, function(){
                        $scope.isLoading = false;
                    });
	            };

	            $scope.save = function() {
	                if($scope.form.$invalid || !$scope.model.data.gender){
	                    return false;
	                }
	                
	                if($scope.mode === 'new') {
	                    $scope.saveNew();
	                }
	                else {
	                    $scope.update();
	                }
	            };

	            $scope.updateImage = function() {
	            	$scope.model.data.photo = null;
	            };

	            $scope.cancel = function() {
	                $scope.model.reset();
	                if($stateParams.backState) {
                		var params = $stateParams.echoParams || {};
                		params.clientId = 0;
                		$state.go($stateParams.backState, params);
                	}
                	else {
	                    $state.go("^.list");
                	}
	            };

	            $scope.getReqdData = function() {
	                $scope.isLoading = true;
	                return $q.all([
	                	systemDataService.getStates(),
	                	systemDataService.getCountries()
                	]).then(function(){
	                    $scope.isLoading = false;
	                }, function(){
	                    $scope.isLoading = false;
	                });
	            };

            	init();
            }
        ]);
});
