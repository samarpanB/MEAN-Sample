define(['angular','formBuilder/formMainDirective', 'formBuilder/formFieldDirective'], 
	function(angular, dynamicFormDirective, formFieldDirective){
	'use strict';

	var module = angular.module('formBuilder',[]);
	// Directive
	module
	.directive('dynamicForm', dynamicFormDirective)
	.directive('formField', formFieldDirective);
});