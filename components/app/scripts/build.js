/*jshint unused: vars */
'use strict';

require.config({
    paths: {
        angular: 'ext/angular',
        jquery: 'ext/jquery.min',
        'text': 'ext/text',
        '_': 'ext/underscore-min'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        '_': {
            exports: '_'
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
