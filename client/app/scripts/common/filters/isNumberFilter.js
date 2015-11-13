define(['angularAMD', 'underscore'], function (angularAMD, _) {
	'use strict';
    return function(){
    	return function(input) {
	    	return _.isNumber(parseInt(input));
	    };
    };
});