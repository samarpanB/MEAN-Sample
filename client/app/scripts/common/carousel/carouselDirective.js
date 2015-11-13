define(['angular', 'jquery'], function () {
  'use strict';

    return  ['$timeout', function($timeout) {
        return{
                restrict: 'A',
                scope: {
                    carouselReset: '=',
                    nonResponsive: '=',
                    carouselData: '='
                },
                link: function(scope, element){
                    var slickInited = false;

                    var resetSlick = function(){
                        // Destroy previous slick
                        destroySlick();

                        if(scope.nonResponsive) {
                            // Initialize slick
                            $(element).slick({
                                dots: false,
                                infinite: false,
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                variableWidth: true,
                                draggable: false
                            });
                        }
                        else {
                            var responsiveConfig = [], i, cw = 0;

                            // Create config for responsive
                            for(i=0; i < $(element).children().length; i++) {
                                cw = cw + $(element).children().eq(i).width();
                                if(i !== 0) {
                                    responsiveConfig.push({
                                        breakpoint: cw,
                                        settings: {
                                            dots: false,
                                            infinite: false,
                                            slidesToShow: i,
                                            slidesToScroll: 1,
                                            variableWidth: true,
                                            arrows: true
                                        }
                                    });
                                }
                                
                            }
                            
                            // Initialize slick
                            $(element).slick({
                                dots: false,
                                infinite: false,
                                slidesToShow: $(element).children().length,
                                slidesToScroll: 1,
                                respondTo: 'slider',
                                variableWidth: true,
                                draggable: false,
                                arrows: false,
                                responsive: responsiveConfig
                            });
                        }
                        
                        slickInited = true;
                    };

                    var destroySlick = function() {
                        if(slickInited) {
                            $(element).slick("unslick");
                        }
                    };

                    scope.$watch('carouselReset', function(val, old){
                        if(val !== old && val !== false) {
                            $timeout(resetSlick);
                        }
                        else if(val !== old && val === false) {
                            destroySlick();
                        }
                        else if(val === true && !slickInited) {
                            $timeout(resetSlick);
                        }
                    });

                    scope.$watch('nonResponsive', function(val, old){
                        if(val !== old) {
                            $timeout(resetSlick);
                        }
                    });

                    scope.$watch('carouselData', function(val, old){
                        if(val !== old && slickInited) {
                            $timeout(function(){$(element).slick('refresh');});
                        }
                        else if(!slickInited && val && val.length > 0) {
                            $timeout(resetSlick);
                        }
                    }, true);

                    // Garbage collect 
                    scope.$on('$destroy', function() {
                        destroySlick();
                    });

                    // Handle slick destroy
                    $(element).on('destroy', function(){
                        slickInited = false;
                    });
                }
        };
    }];
});