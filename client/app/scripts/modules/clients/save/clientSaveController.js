define(['app', 'underscore', 'bootbox', 'common/constants/maritalStatus',
	'common/constants/clientType'],
    function (app, _, bootbox, MaritalStatus, ClientType) {
    'use strict';

        app.controller('ClientSaveCtrl', ['$scope', '$state', '$stateParams', 'clientModel', 'utils',
        	'constants', '$q', '$timeout', 'systemDataService', 'globals', 'FORM_FIELD_CONSTANTS',
            function ($scope, $state, $stateParams, clientModel, utils, constants, $q, $timeout, systemDataService,
            	globals, FORM_FIELD_CONSTANTS) {

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

            	$scope.formConfig = {

            	};

            	$scope.formItems = [
            		{
            			label: 'First Name',
            			name: 'firstName',
            			css: "form-control",
            			placeholder: 'First Name',
						type: FORM_FIELD_CONSTANTS.text,
						validations: {
							required: {
								value: true,
								message: "First name is mandatory !"
							},
							minlength: {
								value: 2,
								message: "Min length 1"
							},
							maxlength: {
								value: 5,
								message: "Max length 5"
							}
						}
            		},
					{
            			label: 'Email',
            			name: 'email',
            			css: "form-control",
            			placeholder: 'Please enter your email',
						type: FORM_FIELD_CONSTANTS.email,
						isRemovable: true
            		},
					{
            			label: 'Date of birth',
            			name: 'dob',
            			css: "form-control",
            			placeholder: 'mm-dd-yyyy',
						type: FORM_FIELD_CONSTANTS.date
            		},
					{
            			label: 'Current time',
            			name: 'currentTime',
            			css: "form-control",
            			placeholder: 'HH:mm',
						type: FORM_FIELD_CONSTANTS.time
            		},
					{
            			label: 'Event schedule',
            			name: 'eventDt',
            			css: "form-control",
            			placeholder: 'mm-dd-yyyy HH:mm',
						type: FORM_FIELD_CONSTANTS.dateTime
            		},
					{
            			label: 'Webpage',
            			name: 'webpage',
            			css: "form-control",
            			placeholder: 'Webpage',
						type: FORM_FIELD_CONSTANTS.url
            		},
					{
            			label: 'Country',
            			name: 'country',
            			css: "form-control",
            			// placeholder: 'Select....',
						type: FORM_FIELD_CONSTANTS.singleSelect,
						dataSource: [
							"India",
							"Australia",
							"South Africa",
							"USA"
						]
            		},
					{
            			label: 'State',
            			name: 'state',
            			css: "form-control",
            			// placeholder: 'Select....',
						type: FORM_FIELD_CONSTANTS.multiSelect,
						dataSource: [
							"Punjab",
							"Haryana",
							"Himachal Pradesh",
							"New Delhi",
							"Chandigarh"
						]
            		},
					{
            			label: 'Sign Mandatory',
            			name: 'isSignMandatory',
            			css: "form-control",
            			placeholder: 'Sign Mandatory',
						type: FORM_FIELD_CONSTANTS.checkbox
            		},
					{
            			label: 'Description',
            			name: 'description',
            			css: "form-control",
            			placeholder: 'Description',
						type: FORM_FIELD_CONSTANTS.textArea
            		}
            	];
            }
        ]);
});
