/*jshint camelcase: false */
define(['angular', 'underscore', 'text!common/json/mockUser.json'],function(angular, _, userJS){

    'use strict';
    var module = angular.module('sessionMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {   
        var creds = {
            access_token: "test",
            expires_in: 3600,
            refresh_token: "test",
            token_type: "bearer"
        };

        mockHelper.mockRespond($httpBackend.whenPOST(/auth\/login$/m), function(method, url, data){
            data = angular.fromJson(data);
            if(data.username && data.password) {
                return [200, creds, {}];
            }
            else {
                return [401, {message: "Unauthorised"}, {}];
            }
        }, true);

        mockHelper.mockRespond($httpBackend.whenPOST(/auth\/extendsession/), function(method, url, data){
            data = angular.fromJson(data);
            if(data.refreshToken) {
                return [200, creds, {}];
            }
            else {
                return [401, {message: "Unauthorised"}, {}];
            }
        }, true);

        mockHelper.mockRespond($httpBackend.whenPOST(/auth\/logout/), function(){
            return [200, {message: "User logged out successfully"}, {}];
        }, true);

        mockHelper.mockRespond($httpBackend.whenGET(/users\/me$/m), angular.fromJson(userJS), true);
    }]);
	return module;
});