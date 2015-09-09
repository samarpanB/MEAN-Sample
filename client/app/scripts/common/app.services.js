define(['angular', 'common/app.constants', 'common/app.values', 'common/app.utils',
	'common/ws/sessionService'], 
	function (angular, constants, globals, utils, sessionService){
	'use strict';

	var module = angular.module('services',[]);

    // Application level constants
	module.constant('constants', constants);

	 // Application level values
	module.value('globals', globals);

	// Application level Helper factories
	module.factory('Utils',utils);
	module.factory('sessionService', sessionService);

	return module;
});