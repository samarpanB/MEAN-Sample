define(['app'], 
  function (app) {
  'use strict';

    app.controller('HomeCtrl', ['$scope', 'usersModel',
        function ($scope, usersModel) {

        	$scope.model = usersModel.init();
        	$scope.model.fetch();
            
    }]);
});
