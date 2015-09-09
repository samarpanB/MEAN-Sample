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
	            	$sessionStorage.advAccessToken = resp.data.access_token;
	            	$sessionStorage.advRefreshToken = resp.data.refresh_token;
	            	deferred.resolve(resp);
	            }, function(err){
	            	$sessionStorage.advAccessToken = '';
	            	$sessionStorage.advRefreshToken = '';
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
	        		$http.post('auth/extendsession/'+refreshToken).then(function(resp){
		            	$sessionStorage.advAccessToken = resp.data.access_token;
		            	$sessionStorage.advRefreshToken = resp.data.refresh_token;
		            	deferred.resolve(resp);
		            }, function(err){
		            	$sessionStorage.advAccessToken = '';
		            	$sessionStorage.advRefreshToken = '';
		            	deferred.reject(err);
		            });
	        	}
	            

	            return deferred.promise;
	        }
		};
	}];
});