define(['angularAMD', 'angular','underscore'], function (angularAMD, angular, _) {
	'use strict';

	/* Utils */

	angularAMD.factory("utils", [function () {
		return {

			// invoked to sort alphabatically on results array, used by Select2 control
            sortAlphabetic : function(results) {
                return results.sort(function(a, b) {
                    var A = a.text.toLowerCase();
                    var B = b.text.toLowerCase();
                    return A > B ? 1 : A < B ? -1 : 0;
                });
            },

            // Invoked to get field object from the array for the specified id
            getFieldById: function(arr, id) {
                return _.findWhere(arr, {id: id});
            },

            omitInvalidKeys: function(obj, validObj) {
                var validKeys = _.keys(validObj);
                return _.pick(obj, validKeys);
            }
		};
	}]);
});