define([], function () {
    'use strict';
    return function(){
        return function(value, limitVal){
            return value ? (value).toFixed(limitVal || 2) : '';
        };
    };
});