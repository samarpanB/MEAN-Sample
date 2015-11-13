define(['angular','common/menuTreeItem/menuTreeItemDirective'], function(angular, menuTreeItemDirective){
	'use strict';

	var module = angular.module('menu',[]);
	// Directive
	module.directive('menuTreeItem', menuTreeItemDirective);
});