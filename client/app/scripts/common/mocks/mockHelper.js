define(['config', 'angular'], function (Config) {
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

			updateItemsFromStorage: function(collection, savedItems, editedItems, removedItem) {
            	// add new 
	            if(angular.isDefined(savedItems))
	            {
	                collection.records = collection.records.concat(savedItems);
	            }
	            // modify 
	            if(angular.isDefined(editedItems))
	            {
	                angular.forEach(collection.records,function(val,key){
	                    if(val.id === Number(editedItems[0].id))
	                    {
	                        collection.records[key] = editedItems[0];
	                    }
	                });
	            }
	            // delete
	            if(angular.isDefined(removedItem))
	            {
	                angular.forEach(collection.records,function(val,key){
	                    if(val.id === Number(removedItem.id))
	                    {
	                        collection.records.splice(key,1);
	                    }
	                });
	            }

	            return angular.copy(collection);
	        }
		};
	}];
});