define(['angular', 'common/menuTreeItem/menuTreeItem', 'common/fileUpload/fileUpload', 
	'common/radioGroup/radioGroup', 'common/carousel/carousel'],
	function (angular) {
	'use strict';

	/* Directive Module */
	angular.module('directives', ['menu', 'fileUpload', 'radioGroup', 'carouselComponent']);
});