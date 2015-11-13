define(['app', 'modules/clients/clientTemplates', 
    'modules/clients/list/clientsListController',
    'modules/clients/save/clientSaveController'], 
  function (app) {
  'use strict';

    app.controller('ClientCtrl', ['$scope', '$stateParams', '$state',
        function ($scope, $stateParams, $state) {
        	$scope.goBack = function() {
	            if($stateParams.backState) {
            		var params = $stateParams.echoParams || {};
            		params.clientId = 0;
            		$state.go($stateParams.backState, params);
            	}
            	else {
                    $state.go("^.list");
            	}
        	};
        }
    ]);
});
