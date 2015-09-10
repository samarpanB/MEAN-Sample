define(['common/models/modelBase', 'underscore'],function(ModelBase, _){
	'use strict';
	return ['$q', 'utils', '$http', function($q, utils, $http){
		var self = null;
		// holds original reference of data.
		var model = [];

		function UsersModel()
		{
			var context = this;
			var origData = angular.copy(model);

			// Initialize method
			var initialize = function() {
				context.clear();
			};

			// Overridden
			context.clear = function() {
				context.setData(model);
			};

			// Overridden
			context.reset = function() {
				context.setData(origData);
			};

			// Overridden
			context.fetch = function(isReset, params) {
				if(isReset || !context.promise)
				{
					context.clear();
					context.isLoading = true;
					context.promise = $http.get('users', {params: params}).then(function(response){
			 			context.promise = null;
		 				context.setData(response.data);
			 			context.isLoading = false;
		 				return context.data;
			 		});
				}
				else if(!context.promise)
				{
					context.promise = $q.when(context.data);
				}
				return context.promise;
			};

			// Setup data & original reference to data
			context.setData = function(data){	
				origData = angular.extend({}, model, data);
				context.data = angular.copy(origData);
			};

			context.delete = function(data) {
	 			return $http.delete('users/'+data.id).then(function(){
	 				var d = _.reject(context.data, function(item){
	 					return item.id === data.id;
	 				});
	 				context.setData(d);
	 			});
	 		};

	 		initialize();
		}

		UsersModel.inherits(ModelBase);

		// method to initiate model
		function init() {
			self = new UsersModel();
			return self;
		}

		// Invoked to get current instance 
		function get() {
			return self;
		}

		function destroy() {
            self = null;
            return true;
        }

		return {
			init: init,
			get: get,
            destroy: destroy
		};
	}];
});