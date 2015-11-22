/*jshint unused: vars */
'use strict';

require.config({
    paths: {
        angular: 'ext/angular',
        jquery: 'ext/jquery.min',
        'text': 'ext/text'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        angular: {
            deps: [
                'jquery'
            ],
            exports: 'angular'
        }
    },
    packages: [

    ]
});