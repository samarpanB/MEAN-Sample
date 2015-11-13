define(['jquery'], function ($) {
  'use strict';

return [function () {
        return {
            restrict: 'A',
            scope: {
                radioModel: '=',
                isBoolean: '@',
                valueChange: '&'
            },
            link: function(scope, element) {
                var _watcherRemovers = [];

                var _markLabelActive = function(modelVal) {
                    var labels = $(element).find(".btn");
                    labels.removeClass("active");
                    $.each(labels, function(i, lbl){
                        if($(lbl).find("input").val() === modelVal.toString()) {
                            $(lbl).addClass("active");
                            return false;
                        }
                    });
                };

                $(element).on('click.radioGroup', function(event){
                    scope.$apply(function(){
                        var oldVal = scope.radioModel;
                        scope.radioModel = scope.isBoolean && scope.isBoolean === "true" ? 
                            $(event.target).find("input").val() === "true" : 
                            $(event.target).find("input").val();
                        scope.valueChange({n: scope.radioModel, o: oldVal});
                    });
                });

                _watcherRemovers.push(scope.$watch('radioModel', function(n){
                    _markLabelActive(n);
                }));

                // Garbage collect 
                scope.$on('$destroy', function() {
                    angular.forEach(_watcherRemovers, function(val){
                        val();
                    });
                    $(element).off("click.radioGroup");
                });
            }
        };
    }];
});