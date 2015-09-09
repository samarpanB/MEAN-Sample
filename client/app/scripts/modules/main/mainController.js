define(['app', 'app.routes',
    'modules/main/mainTemplates',
    'modules/login/loginController', 
    'modules/error/errorController', 
    'modules/main/appController'], 
    function () {
    'use strict';

        return ['$rootScope', '$alert', '$timeout', 'mainTmpls',
            function ($rootScope, $alert, $timeout) {
                var currentErrMsg = " ", currentSuccessMsg = " ", errAlert = null, successAlert = null;
                // Global error handler
                $rootScope.$on('error',function(event, message){
                    message = message || " ";
                    if(message !== currentErrMsg) {
                        currentErrMsg = message;
                        errAlert = $alert({
                            title: 'Error!', 
                            content: message,
                            type: 'danger', 
                            show: true,
                            container: '#alerts-container',
                            animation: 'am-fade-and-slide-top',
                            duration: 3
                        });

                        errAlert.$promise.then(function(){
                            $timeout(function(){
                                currentErrMsg = " ";
                            }, 3500);
                        });
                    }
                });

                // Global success handler
                $rootScope.$on('success',function(event, message){
                    message = message || " ";
                    if(message !== currentSuccessMsg) {
                        currentSuccessMsg = message;
                        successAlert = $alert({
                            title: 'success!', 
                            content: message,
                            type: 'success', 
                            show: true,
                            container: '#alerts-container',
                            animation: 'am-fade-and-slide-top',
                            duration: 3
                        });

                        successAlert.$promise.then(function(){
                            $timeout(function(){
                                currentSuccessMsg = " ";
                            }, 3500);
                        });
                    }
                });
            }
        ];
});
