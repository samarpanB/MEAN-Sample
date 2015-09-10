define(['angular', 'underscore', 'text!common/json/mockUsers.json'],
    function(angular, _, usersJS){

    'use strict';
    var module = angular.module('userMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {
    	var users = angular.fromJson(usersJS);

        mockHelper.mockRespond($httpBackend.whenGET(/users\/[0-9]+$/m), function(method, url){
        	var userId = parseInt(_.last(url.split("/")));
        	return mockHelper.findItemById(users, userId);
        });
        mockHelper.mockRespond($httpBackend.whenGET(/users\?+/), function(method, url){
        	var d = mockHelper.getObjFromQparams(url.split("?")[1]);
        	return mockHelper.findItemsByPage(users, d.max, d.offset);
        });
        mockHelper.mockRespond($httpBackend.whenPOST(/users$/m), function(method, url, data){
        	var user = angular.fromJson(data);
        	user.id = new Date().getTime();
        	mockHelper.updateItemsToStore(users, user);
        	return [200, user, {}];
        });
        mockHelper.mockRespond($httpBackend.whenPUT(/users\/[0-9]+$/m), function(method, url, data){
        	var user = angular.fromJson(data);
        	mockHelper.updateItemsToStore(users, null, user);
        	return [200, user, {}];
        });
        mockHelper.mockRespond($httpBackend.whenDELETE(/users\/[0-9]+$/m), function(method, url){
        	var userId = parseInt(_.last(url.split("/")));
        	mockHelper.updateItemsToStore(users, null, null, userId);
        	return [200, {message: "User removed !"}, {}];
        });
    }]);

	return module;
});