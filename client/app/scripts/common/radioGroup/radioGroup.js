define(['angular','common/radioGroup/radioGroupDirective'], 
	function(angular, radioGroupDirective){
	'use strict';

	var module = angular.module('radioGroup',[]);
	// Directive
	module.directive('radioBtnGp', radioGroupDirective);
});