define(['angular', 
    'common/models/userModel',
    'common/models/usersModel'], 
    function (angular, userModel, usersModel) {
    'use strict';

    /* Directive Module */
    var module = angular.module('models', []);

    module.factory('userModel', userModel);
    module.factory('usersModel', usersModel);

    return module;
});