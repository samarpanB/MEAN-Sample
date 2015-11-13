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

            getObjFromQparams: function(qParams) {
                var params = qParams.split('&');
                var obj = {};
                angular.forEach(params, function(p){
                    var keyVal = p.split('=');
                    obj[keyVal[0]] = keyVal[1];
                });
                return obj;
            },

            // Invoked to get field object from the array for the specified id
            getObjectById: function(arr, id) {
                return _.findWhere(arr, {_id: id});
            },

            omitInvalidKeys: function(obj, validObj) {
                var validKeys = _.keys(validObj);
                return _.pick(obj, validKeys);
            },

            // Invoked to pluck ids from the array of objects
            reduceToIds: function(arr) {
                return (!arr || arr.length === 0 || angular.isString(arr[0])) ?
                    arr :
                    _.pluck(arr, '_id');
            },

            updateFileNames: function(files) {
                return _.map(files, function(f) {
                    let splitArr = f.name.split("-");
                    splitArr.splice(0, 2);
                    f.name = splitArr && splitArr.length > 0 ? splitArr.join("-") : f.name;
                    return f;
                });
            },

            // Invoked to parse a string into an array of tags with each object holding tag value under text key.
            parseToTags: function(str, separator) {
                var arr = separator ? str.split(separator) : str.split(",");
                return _.map(arr, function(v) {
                    return {
                        text: v
                    };
                });
            },

            // Invoked to parse a an array of tags into single flat string seprated by mentioned separator
            parseFromTags: function(tags, separator) {
                return _.reduce(tags, function(memo, t) {
                    return memo.length > 0 ? memo + (separator || ",") + t.text : t.text;
                }, "");
            }
		};
	}]);
});