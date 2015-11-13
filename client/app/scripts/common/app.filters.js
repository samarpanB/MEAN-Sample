define(['angular', 'common/filters/roundOffFilter', 'common/filters/isNumberFilter'], 
	function (angular, roundOffFilter, isNumberFilter){
	'use strict';

	var module = angular.module('filters',[]);

	module.filter('roundOff', roundOffFilter);
	module.filter('isNumber', isNumberFilter);
	
	return module;
});