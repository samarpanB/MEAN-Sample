define(['angular'], function (angular) {
'use strict';

/*
 * An AngularJS Localization Service
 *
 * Written by Jim Lavin
 * http://codingsmackdown.tv
 *
 */

angular.module('localization', [])
    // localization service responsible for retrieving resource files from the server and
    // managing the translation dictionary
    .factory('localize', ['$http', '$rootScope', '$window', 
        function ($http, $rootScope, $window) {
        var localize = {
            // use the $window service to get the language of the user's browser
            language: $window.navigator.userLanguage || $window.navigator.language,
            
            // array to hold the localized resource string entries
            dictionary: null,
            // flag to indicate if the service hs loaded the resource file
            resourceFileLoaded:false,

            // success handler for all server communication
            successCallback:function (resp) {
                // store the returned array in the dictionary
                localize.dictionary = resp.data;
                // set the flag that the resource are loaded
                localize.resourceFileLoaded = true;
                // broadcast that the file has been loaded
                $rootScope.$broadcast('localizeResourcesUpdated');

                return resp.data;
            },

            // allows setting of language on the fly
            setLanguage: function(value) {
                localize.language = value;
                return localize.initLocalizedResources();
            },

            // loads the language resource file from the server
            initLocalizedResources:function () {
                // build the url to retrieve the localized resource file
                var url = 'resources/' + localize.language + '.json';
                // request the resource file
                return $http({ method:'GET', url:url, cache:false }).then(localize.successCallback, function () {
                    // the request failed set the url to the default resource file
                    var url = 'resources/en-us.json';
                    // request the default resource file
                    return $http({ method:'GET', url:url, cache:false }).then(localize.successCallback);
                });
            },

            // checks the dictionary for a localized resource string
            getLocalizedString: function(key) {
                var value = localize.dictionary && localize.dictionary.hasOwnProperty(key) ? localize.dictionary[key] : '';

                // return the value to the call
                return value;
            }
        };

        // force the load of the resource file
        //localize.initLocalizedResources();

        // return the local instance when called
        return localize;
    } ])
    // simple translation filter
    // usage {{ TOKEN | i18n }}
    .filter('i18n', ['localize', function (localize) {
        return function (input) {
            return localize.getLocalizedString(input);
        };
    }]);
});