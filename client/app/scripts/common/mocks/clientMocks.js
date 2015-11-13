define(['angular', 'underscore', 'text!common/json/mockClients.json'],
    function(angular, _, clientsJS){

    'use strict';
    var module = angular.module('clientMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {
    	var clients = angular.fromJson(clientsJS);

        mockHelper.mockRespond($httpBackend.whenGET(/clients\/+/), function(method, url){
        	var clientId = _.last(url.split("/"));
        	return mockHelper.findItemById(clients, clientId);
        }, true);
        mockHelper.mockRespond($httpBackend.whenGET(/clients\?+/), function(method, url){
        	var d = mockHelper.getObjFromQparams(url.split("?")[1]);
        	return mockHelper.findItemsByPage(clients, d.max, d.offset);
        }, true);
        mockHelper.mockRespond($httpBackend.whenPOST(/clients$/m), function(method, url, data){
        	var client = angular.fromJson(data);
        	client.id = new Date().getTime();
        	mockHelper.updateItemsToStore(clients, client);
        	return [200, client, {}];
        }, true);
        mockHelper.mockRespond($httpBackend.whenPUT(/clients\/+/), function(method, url, data){
        	var client = angular.fromJson(data);
        	mockHelper.updateItemsToStore(clients, null, client);
        	return [200, client, {}];
        }, true);
        mockHelper.mockRespond($httpBackend.whenDELETE(/clients\/+/), function(method, url){
        	var clientId = _.last(url.split("/"));
        	mockHelper.updateItemsToStore(clients, null, null, clientId);
        	return [200, {message: "Client removed !"}, {}];
        }, true);
    }]);

	return module;
});