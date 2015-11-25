define(['angular'], function (angular) {
    'use strict';

    return [function () {
        return {
            normalizeFormValues: function(serializedArr) {
                var normalized = [],
                    addedKeys = {};
                angular.forEach(serializedArr, function(item) {
                    if(addedKeys.hasOwnProperty(item.name)) {
                        addedKeys[item.name] += "," + item.value;
                    } else {
                        addedKeys[item.name] = item.value;
                    }
                });

                angular.forEach(addedKeys, function(val, key) {
                    normalized.push({
                        name: key,
                        value: val
                    });
                });

                return normalized;
            }
        };
    }];
});
