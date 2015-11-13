define(['angular', 'common/carousel/carouselDirective'],
	function (angular, carouselDirective) {
	'use strict';

	/* Directive Module */
	var module = angular.module('carouselComponent', []);

    module.directive('carousel', carouselDirective);
});