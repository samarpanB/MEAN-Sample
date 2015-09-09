define(['angular', 'text!common/json/mockUser.json', 'text!common/json/mockUsers.json'],
    function(angular, userJS, usersJS){

    'use strict';
    var module = angular.module('userMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {
        mockHelper.mockRespond($httpBackend.whenGET(/users\/[0-9]+$/m), angular.fromJson(userJS));
        mockHelper.mockRespond($httpBackend.whenGET(/users$/m), angular.fromJson(usersJS));
    }]);

	return module;
});