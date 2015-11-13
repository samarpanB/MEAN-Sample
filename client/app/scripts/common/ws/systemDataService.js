define(['angular'], function () {
    'use strict';

    /* System Data Service Factory */

    return ['$http', '$q', 'globals',
        function ($http, $q, globals) {

            // Internal function to invoke actual web service based on the URI in argument & update the globals reference
            // This method returns a promise object which could be used for further manipulation.
            var invokeFn = function(uri, globalsRefKey, params) {
                var deferred = $q.defer();
                if(!params) {
                    params = {};
                }

                if (globals.systemData[globalsRefKey]) {
                    deferred.resolve(globals.systemData[globalsRefKey]);
                }
                else if(globals.systemData[globalsRefKey+'_promise']) {
                    deferred.promise = globals.systemData[globalsRefKey+'_promise'];
                }
                else {
                    $http.get(uri, {params: params}).then(function (resp) {
                        globals.systemData[globalsRefKey] = resp.data;
                        globals.systemData[globalsRefKey+'_promise'] = null;
                        deferred.resolve(resp.data.records);
                    }, function (err) {
                        globals.systemData[globalsRefKey] = [];
                        globals.systemData[globalsRefKey+'_promise'] = null;
                        deferred.reject(err);
                    });
                    // Need to test below line. This is added to avoid multiple calls when simultaneous invocations occur.
                    globals.systemData[globalsRefKey+'_promise'] = deferred.promise;
                }

                return deferred.promise;
            };

            return {
                getStates: function () {
                    return invokeFn('states', 'states');
                },
                getCountries: function () {
                    return invokeFn('countries', 'countries');
                },
                getCaseTypes: function () {
                    return invokeFn('casetypes', 'caseTypes');
                },
                getCourts: function () {
                    return invokeFn('courts', 'courts');
                },
                getFileCategories: function() {
                    return invokeFn('cases/filecategories', 'filecategories');
                }
            };
        }];
});
