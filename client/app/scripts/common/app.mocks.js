define(['angular', 'angular-mocks', 'common/mocks/mockHelper', 'common/mocks/sessionMocks', 'common/mocks/userMocks'],
    function (angular, angularMocks, mockHelper) {
        'use strict';
        var module = angular.module('mocks', ['ngMockE2E', 'sessionMocks', 'userMocks']);
        module.factory('mockHelper', mockHelper);

        module.run(['$httpBackend', 'mockHelper', function ($httpBackend, mockHelper) {
            mockHelper.mockRespond($httpBackend.whenGET(/resources\/*/));
        }]);

        return module;
    }
);
