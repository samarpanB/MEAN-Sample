define(['angular','formBuilder/formMainDirective', 'formBuilder/formFields/formFieldDirective',
	'formBuilder/formFields/formFieldConstants', 'formBuilder/formFields/formFieldTemplateService',
	'formBuilder/formUtilsFactory'],
	function(angular, dynamicFormDirective, formFieldDirective, formFieldConstants,
		formFieldTemplateService, formUtilsFactory) {
	'use strict';

	var module = angular.module('formBuilder',[]);
	// Directive
	module
	.constant('FORM_FIELD_CONSTANTS', formFieldConstants)
	.service('formFieldTemplateService', formFieldTemplateService)
	.factory('formUtils', formUtilsFactory)
	.directive('dynamicForm', dynamicFormDirective)
	.directive('formField', formFieldDirective);
});
