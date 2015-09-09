define(['angular', 'common/filters/roundOffFilter'], 
	function (angular, roundOffFilter){
	'use strict';

	var module = angular.module('filters',[]);

	module.filter('roundOff', roundOffFilter);
	
	return module;
});