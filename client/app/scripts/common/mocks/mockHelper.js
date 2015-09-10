define(['config', 'angular', 'underscore'], function (Config, angular, _) {
	'use strict';

	/* Mocking Helper  */

	return [function () {
		return {
			// Generic method that helps in deciding whether to respond from mocks or actual http request is made
			// request: $httpbackend request
			/* 	Case 1: If any web call is needed to go to mock backend when config mode is test, 
				but send http request when config mode is dev. 
				* Send responder & isPassThrough as true.
				Case 2: If any web call is needed to go to mock backend always. 
				* Send responder & isPassThrough as false or undefined.
				Case 3: If any web call is needed to send http request always. 
				* Do not send responder & isPassThrough, or send both as false.
			*/
			mockRespond : function(request, responder, isPassThrough){
				if(responder && (Config.mode === 'test' || !isPassThrough))
				{
					return request.respond(responder);
				}
				else
				{
					return request.passThrough();
				}
			},

			updateItemsToStore: function(collection, savedItem, editedItem, removedItemId) {
            	// add new 
	            if(savedItem)
	            {
	                collection.records.push(savedItem);
	                collection.totalRecords++;
	            }
	            // modify 
	            if(editedItem)
	            {
	                angular.forEach(collection.records,function(val,key){
	                    if(val.id === Number(editedItem.id))
	                    {
	                        collection.records[key] = editedItem;
	                    }
	                });
	            }
	            // delete
	            if(removedItemId)
	            {
	                angular.forEach(collection.records,function(val,key){
	                    if(val.id === Number(removedItemId))
	                    {
	                        collection.records.splice(key,1);
	                    }
	                });
	                collection.totalRecords--;
	            }

	            return angular.copy(collection);
	        },

	        findItemById: function(collection, itemId) {
	        	var item = _.findWhere(collection.records, {id: itemId});
	        	if(item) {
	        		return [200, item, {}];
	        	}
	        	else {
	        		return [404, {message: "Item not found !"}, {}];
	        	}
	        },

	        findItemsByPage: function(collection, max, offset) {
	        	var items = _.first(_.rest(collection.records, offset), max);
	        	if(items) {
	        		return [200, {records: items, totalRecords: collection.totalRecords}, {}];
	        	}
	        	else {
	        		return [404, {message: "Items not found !"}, {}];
	        	}
	        },

	        getObjFromQparams: function(qParams) {
                var params = qParams.split('&');
                var obj = {};
                angular.forEach(params, function(p){
                    var keyVal = p.split('=');
                    obj[keyVal[0]] = keyVal[1];
                });
                return obj;
            }
		};
	}];
});