define(['jquery'], function ($) {
  'use strict';

return ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var _watcherRemovers = [];
                
                var _openSubMenu = function(e) {
                    if(e && $(e.target).parents('.sub-menu').length > 0 &&
                        $(e.target).parents('.sub-menu').has($(element)).length === 0) {
                        return;
                    }

                    var parent = $(element).parent();
                    var sub = $(element).children('.sub-menu');

                    if (sub.length === 0) {
                        parent.children('li').removeClass('active');
                        $(element).addClass('active');
                    }
                    else if(!sub.is(":visible") || e) {
                        parent.children('li.open').children('a').children('.arrow').removeClass('open');
                        parent.children('li.open').children('a').children('.arrow').removeClass('active');
                        parent.children('li.open').children('.sub-menu').slideUp(200);
                        parent.children('li').removeClass('open');
                        parent.children('li').removeClass('active');
                        //  parent.children('li').removeClass('active');

                        if (sub.is(":visible")) {
                            // $(element).find('.arrow').removeClass("open");
                            // $(element).removeClass("open");
                            // sub.slideUp(200, function () {
                            //     _handleSidebarAndContentHeight();
                            // });
                        } else {
                            $(element).find('.arrow').addClass("open");
                            $(element).addClass("open");
                            sub.slideDown(200, function () {
                                // _handleSidebarAndContentHeight();
                            });
                        }
                    }
                };

                $(element).on("click", _openSubMenu);

                _watcherRemovers.push(scope.$watch(function(){
                    return attrs.activateMenu ? $parse(attrs.activateMenu)(scope) : false;
                }, function(n){
                    if(n) {
                        $timeout(function(){
                            _openSubMenu();
                        });
                    }
                }));

                // Destroy handler
                scope.$on('$destroy', function(){
                    $(element).off("click", _openSubMenu);
                    angular.forEach(_watcherRemovers, function(val){
                        val();
                    });
                });
            }
        };
    }];
});