define(['angular', 'common/app.constants', 'common/app.values', 'common/app.utils',
	'common/ws/sessionService', 'common/ws/systemDataService'], 
	function (angular, constants, globals, utils, sessionService, systemDataService){
	'use strict';

	var module = angular.module('services',[]);

    // Application level constants
	module.constant('constants', constants);

	 // Application level values
	module.value('globals', globals);

	// Application level Helper factories
	module.factory('Utils',utils);
	module.factory('sessionService', sessionService);
	module.factory('systemDataService', systemDataService);

	return module;
});