/*jshint unused: vars */
define([], function () {
	'use strict';

	return function ModelBase() {
		var context = this;
		
		context.data = null;

		// Invoked to fetch data from service.
		// Service will be forcefully invoked if first parameter is true.
		context.fetch = function(isReset, params) {
			// Abstract. To be defined by derived classes.
		};

		// Invoked to reset data from service. Forced fetch.
		context.reset = function(params) {
			return this.fetch(true, params);
		};

		// Invoked to clear data from model.
		context.clear = function() {
			context.data = null;
		};

		// Save model to database.
		context.save = function(data) {
			// Abstract. To be defined by derived classes.
		};

		// Update model into database
		context.update = function(data) {
			// Abstract. To be defined by derived classes.
		};
	};
});