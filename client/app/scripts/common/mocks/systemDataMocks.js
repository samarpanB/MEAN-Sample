/*jshint camelcase: false */
define(['angular', 'underscore', 
    'text!common/json/mockStates.json',
    'text!common/json/mockCountries.json',
    'text!common/json/mockCourts.json',
    'text!common/json/mockActs.json',
    'text!common/json/mockCompanies.json',
    'text!common/json/mockGovtDepts.json',
    'text!common/json/mockSections.json',
    'text!common/json/mockFileCategories.json'],
    function(angular, _, 
        statesJS,
        countriesJS,
        courtsJS,
        actsJS,
        companiesJS,
        govtDeptsJS,
        sectionsJS,
        fileCategoriesJS) {

    'use strict';
    var module = angular.module('systemDataMocks',['ngMockE2E']);

    //Run
    module.run(['$httpBackend', 'mockHelper',function($httpBackend, mockHelper) {   
        mockHelper.mockRespond($httpBackend.whenGET(/states$/m), angular.fromJson(statesJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/countries$/m), angular.fromJson(countriesJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/courts$/m), angular.fromJson(courtsJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/acts/m), angular.fromJson(actsJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/companies/m), angular.fromJson(companiesJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/govtdepts/m), angular.fromJson(govtDeptsJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/sections/m), angular.fromJson(sectionsJS), true);
        mockHelper.mockRespond($httpBackend.whenGET(/cases\/filecategories/m), angular.fromJson(fileCategoriesJS), true);
    }]);
	return module;
});