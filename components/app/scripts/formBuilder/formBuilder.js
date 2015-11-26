define(['angular','formBuilder/formMainDirective', 'formBuilder/formFields/formFieldDirective',
	'formBuilder/formFields/formFieldConstants', 'formBuilder/formFields/formFieldTemplateService',
	'formBuilder/formUtilsFactory', 'formBuilder/formDefaultValidationMsgs'],
	function(angular, dynamicFormDirective, formFieldDirective, formFieldConstants,
		formFieldTemplateService, formUtilsFactory, formDefaultValidationMsgs) {
	'use strict';

	var module = angular.module('formBuilder',[]);
	// Directive
	module
	.constant('FORM_FIELD_CONSTANTS', formFieldConstants)
	.value('formDefaultValidationMessages', formDefaultValidationMsgs)
	.provider('formFieldTemplateService', formFieldTemplateService)
	.factory('formUtils', formUtilsFactory)
	.directive('dynamicForm', dynamicFormDirective)
	.directive('formField', formFieldDirective);
});
