define(['common/models/modelBase', 'text!common/json/user.json'],function(ModelBase, userJs){
	'use strict';
	return ['$q', 'utils', '$http', function($q, utils, $http){
		var self = null;
		// holds original reference of data.
		var model = angular.fromJson(userJs);

		function UserModel()
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
				context.userId = 0;
			};

			// Overridden
			context.reset = function() {
				context.setData(origData);
			};

			// Overridden
			context.fetch = function(isReset, userId) {
				userId = userId ? userId : context.userId;
				if(userId && (isReset || !context.promise))
				{
					context.clear();
					context.isLoading = true;
					context.promise = $http.get('users/'+userId).then(function(response){
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

			// Overridden
	 		context.save = function(data){
	 			return $http.post('users', data).then(function(response) {
	 				context.setData(response);
	 				return context.data;
				});
	 		};

	 		// Overridden
	 		context.update = function(data){
	 			return $http.post('users/'+data.id, data).then(function(response) {
	 				context.setData(response);
	 				return context.data;
				});
	 		};

	 		context.delete = function(data) {
	 			return $http.delete('users/'+data.id).then(function() {
	 				context.clear();
				});
	 		};

	 		initialize();
		}

		UserModel.inherits(ModelBase);

		// method to initiate model
		function init() {
			return new UserModel();
		}

		// Invoked to get current instance 
		function get() {
			return self;
		}

		return {
			init: init,
			get: get
		};
	}];
});