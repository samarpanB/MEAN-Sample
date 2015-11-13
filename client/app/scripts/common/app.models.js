define(['angular', 'common/models/clientModel', 'common/models/clientsModel', 'common/models/userModel'], 
    function (angular, clientModel, clientsModel, userModel) {
    'use strict';

    /* Directive Module */
    var module = angular.module('models', []);

    module.factory('clientModel', clientModel);
    module.factory('clientsModel', clientsModel);
    module.factory('userModel', userModel);
    
    return module;
});