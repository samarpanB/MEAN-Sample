define(['angular', 'angular-mocks', 'common/mocks/mockHelper', 'common/mocks/sessionMocks', 
	'common/mocks/clientMocks', 'common/mocks/systemDataMocks'],
    function (angular, angularMocks, mockHelper) {
        'use strict';
        var module = angular.module('mocks', ['ngMockE2E', 'sessionMocks', 'clientMocks', 'systemDataMocks']);
        module.factory('mockHelper', mockHelper);

        module.run(['$httpBackend', 'mockHelper', function ($httpBackend, mockHelper) {
            mockHelper.mockRespond($httpBackend.whenGET(/resources\/*/));

            mockHelper.mockRespond($httpBackend.whenPOST(/upload/));
        }]);

        return module;
    }
);
