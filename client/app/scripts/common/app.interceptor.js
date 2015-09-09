define(['angular', 'underscore', 'config', 'bootbox'], function(angular, _, appConfig, bootbox) {
 'use strict';

  return['$q', '$log', '$rootScope', '$localStorage', '$sessionStorage', '$injector', '$filter',
    function($q, $log, $rootScope, $localStorage, $sessionStorage, $injector, $filter) {
        var ignorePaths = ['resources/', '.html'];
        var ignoreURIs = ['auth/extendsession', 'auth/login'];
        var lastDeferredPromise = null;
        var alertWindow = null;

        // Update config.....
        var updateConfig = function(conf, appConfig) {
            // Check if uri invoked is for authentication
            if(conf.url.indexOf('auth/') >= 0)
            {
                conf.url = appConfig.wsBaseUri + '/' + appConfig.wsVersion + '/' + conf.url;
            }
            else if($sessionStorage.advAccessToken)
            {
                conf.headers.Authorization = "Bearer " + $sessionStorage.advAccessToken;
                if(conf.url.indexOf(appConfig.wsBaseUri + '/' + appConfig.wsVersion + '/') === -1){
                    conf.url = appConfig.wsBaseUri + '/' + appConfig.wsVersion + '/' + conf.url;                    
                }
            }
            else
            {
                return false;
            }
            return true;
        };

        return {
            'request': function(conf) {
                // var deferred;

                // Check if uri invoked is under ignored paths. If yes, return immediately....
                var ignored = _.find(ignorePaths, function(p){
                    return conf.url.indexOf(p) >= 0;
                });
                if(angular.isDefined(ignored))
                {
                    return conf;
                }

                // Check if application config loaded & update config of request accordingly as well
                if(appConfig && updateConfig(conf, appConfig))
                {
                    return conf;
                }
                else
                {
                    // If any error while updating config, reject request....
                    return $q.reject('Request Forbidden');
                }
            },

            'requestError': function(rejection) {
                $log.error('Request rejected: ' + rejection.message);
                return $q.reject(rejection);
            },

            'response': function(response) {
                if(response.config.method.toLowerCase() === 'post' && response.status === 200) {
                    var match = _.find(ignoreURIs,function(uri){
                        return response.config.url.indexOf(uri) >= 0;
                    });
                    if(!match) {
                        $rootScope.$broadcast('success', 'Operation Succeeded');
                    }
                }
                $log.log(' Response successfully fetched for ' + response.config.method + ' ' + response.config.url);
                return response;
            },

            responseError: function(response) {
                // Session has expired
                if (response.status === 401 && response.config.url.indexOf('auth/') < 0) {
                    var SessionService = $injector.get('sessionService'),
                        $http = $injector.get('$http'),
                        $state = $injector.get('$state'),
                        i18nFilter = $filter('i18n'),
                        deferred;
                    
                    // If there is some last deferred promise, means we have already invoked WS for token refresh.
                    // So, try to recover session iff, there is no last deferred promise
                    if(!lastDeferredPromise) {
                        deferred = $q.defer();
                        // Recover the session
                        SessionService.refresh($sessionStorage.advRefreshToken).then(deferred.resolve, deferred.reject);
                        // Store latest deferred promise
                        lastDeferredPromise = deferred.promise;
                    }

                    // When the session recovered, make the same backend call again and chain the request
                    return lastDeferredPromise.then(function() {
                        return $http(response.config).then(function(){
                            lastDeferredPromise = null;
                        });
                    }, function(){
                        lastDeferredPromise = null;
                        if(!alertWindow) {
                            alertWindow = bootbox.alert({
                                message:i18nFilter("sessionFailMsg"),
                                title: i18nFilter('errorTitle'),
                                closeButton: false,
                                buttons: {
                                    ok: {
                                        label: i18nFilter("goLoginTitle")
                                    }
                                },
                                callback: function() {
                                    $state.go('main.login');
                                    alertWindow = null;
                                }
                            });
                        }
                        return $q.reject(response);
                    });
                }
                else if(response.data && angular.isDefined(response.data.detail)) {
                    $rootScope.$broadcast('error', response.data.detail);
                    $log.error('Request: '+response.config.url+' Response Error : ' + response.data.detail);
                }
                else if (response.status && angular.isDefined(response.statusText)) {
                    $rootScope.$broadcast('error', response.statusText);
                    $log.error('Request: '+response.config.url+' Response Error : ' + response.statusText);
                }
                else {
                    // For every other scenario....
                    $log.error('Unknown error occurred in response : ' + response);
                }
                return $q.reject(response);
            }

        };
      }];
  });
