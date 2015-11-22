define(['angular','fileUpload/fileUploadDirective'], function(angular, uploadDirective){
	'use strict';

	var module = angular.module('fileUpload',[]);
	// Directive
	module.directive('fileModel', uploadDirective);
});