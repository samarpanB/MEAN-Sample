/*jshint camelcase: false */
define(['angular'],function(angular){

    'use strict';
    var module = angular.module('sessionMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {   
        var creds = {
            access_token: "test",
            expires_in: 899,
            refresh_token: "test",
            scope: "read write",
            token_type: "bearer"
        };

        mockHelper.mockRespond($httpBackend.whenPOST(/auth\/*/), 
            function() {
                return [200, creds, {}];
            }, true);
    }]);
	return module;
});