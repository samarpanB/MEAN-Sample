/*jshint camelcase: false */
define(['angular', 'jquery'], function () {
	'use strict';

	/* Session Service Factory */

	return ['$http', '$localStorage', '$sessionStorage', '$q', '$timeout',
		function ($http, $localStorage, $sessionStorage, $q, $timeout) {

		return {
			login: function(userName, password) {
	            var data = {
	                username: userName,
	                password: password
	            };
	            var deferred = $q.defer();
	            $http.post('auth/login', data).then(function(resp){
	            	$sessionStorage.demoAccessToken = resp.data.access_token;
	            	$sessionStorage.demoRefreshToken = resp.data.refresh_token;
	            	deferred.resolve(resp);
	            }, function(err){
	            	$sessionStorage.demoAccessToken = '';
	            	$sessionStorage.demoRefreshToken = '';
	            	deferred.reject(err);
	            });

	            return deferred.promise; 
	        },
	        refresh: function(refreshToken) {
	        	var deferred = $q.defer();
	        	if(!refreshToken || refreshToken.length === 0)
	        	{
	        		$timeout(function(){
	        			deferred.reject('Unauthorised');
	        		}, 0, false);
	        	}
	        	else
	        	{
	        		$http.post('auth/extendsession', {refreshToken: refreshToken}).then(function(resp){
		            	$sessionStorage.demoAccessToken = resp.data.access_token;
		            	$sessionStorage.demoRefreshToken = resp.data.refresh_token;
		            	deferred.resolve(resp);
		            }, function(err){
		            	$sessionStorage.demoAccessToken = '';
		            	$sessionStorage.demoRefreshToken = '';
		            	deferred.reject(err);
		            });
	        	}
	            

	            return deferred.promise;
	        },
	        logout: function() {
	        	var deferred = $q.defer();
	            $http.post('auth/logout').then(function(resp){
	            	delete $sessionStorage.demoAccessToken;
		            delete $sessionStorage.demoRefreshToken;
		            delete $localStorage.demoRememberMe;
	            	deferred.resolve(resp);
	            }, function(err){
	            	delete $sessionStorage.demoAccessToken;
		            delete $sessionStorage.demoRefreshToken;
		            delete $localStorage.demoRememberMe;
	            	deferred.reject(err);
	            });

	            return deferred.promise;
	        }
		};
	}];
});