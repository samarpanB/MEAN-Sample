define(['common/models/modelBase', 'text!common/json/client.json'],function(ModelBase, clientJs){
	'use strict';
	return ['$q', 'utils', '$http', function($q, utils, $http){
		var self = null;
		// holds original reference of data.
		var model = angular.fromJson(clientJs);

		function ClientModel()
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
				context.clientId = 0;
			};

			// Overridden
			context.reset = function() {
				context.setData(origData);
			};

			// Overridden
			context.fetch = function(isReset, clientId) {
				clientId = clientId ? clientId : context.clientId;
				if(clientId && (isReset || !context.promise))
				{
					context.clear();
					context.isLoading = true;
					context.promise = $http.get('clients/'+clientId).then(function(response){
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
	 		context.save = function(data, files){
	 			var file = null;
	 			if(files) {
	 				file = files[0];
	 			}
	 			return $http.post('clients', data).then(function(response) {
	 				context.setData(response.data);
	 				if(file) {
	 					var fd = new FormData();    
						fd.append( 'file', file );
		 				return $http.post('clients/'+response.data._id+'/upload/photo', fd, {
				            transformRequest: angular.identity,
				            headers: {'Content-Type': undefined}
				        }).then(function(){
		 					return context.data;
		 				});
	 				}
	 				else {
	 					return context.data;
	 				}
				});
	 		};

	 		// Overridden
	 		context.update = function(data, files){
	 			var file = null;
	 			if(files) {
	 				file = files[0];
	 				data.photo = angular.copy(model.photo);
	 			}
	 			return $http.put('clients/'+data._id, data).then(function(response) {
	 				context.setData(response.data);
	 				if(file) {
	 					var fd = new FormData();    
						fd.append( 'file', file );
		 				return $http.post('clients/'+response.data._id+'/upload/photo', fd, {
				            transformRequest: angular.identity,
				            headers: {'Content-Type': undefined}
				        }).then(function(){
		 					return context.data;
		 				});
	 				}
	 				else {
	 					return context.data;
	 				}
				});
	 		};

	 		context.delete = function() {
	 			return $http.delete('clients/'+context.data._id).then(function() {
	 				context.clear();
				});
	 		};

	 		initialize();
		}

		ClientModel.inherits(ModelBase);

		// method to initiate model
		function init() {
			self = new ClientModel();
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