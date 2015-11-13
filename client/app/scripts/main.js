/*jshint unused: vars */
'use strict';
Function.prototype.inherits = function (Parent) {
    if (Parent.constructor === Function)
    {
        //Normal Inheritance 
        this.prototype = new Parent();
        this.prototype.constructor = this;
        this.prototype.Parent = Parent.prototype;
    }
    else
    {
        //Pure Virtual Inheritance 
        this.prototype = Parent;
        this.prototype.constructor = this;
        this.prototype.Parent = Parent;
    }
    return this;
};

require.config({
    paths: {
        angular: 'ext/angular',
        'angular-mocks': 'ext/angular-mocks',
        'angular-strap': 'ext/angular-strap',
        'angular-strap.tpl': 'ext/angular-strap.tpl',
        'angular-ui-router': 'ext/angular-ui-router',
        angularAMD: 'ext/angularAMD',
        bootbox: 'ext/bootbox',
        bootstrap: 'ext/bootstrap.min',
        jquery: 'ext/jquery.min',
        ngStorage: 'ext/ngStorage.min',
        'text': 'ext/text',
        underscore: 'ext/underscore',
        'tmplRegister': 'common/app.templateRegister',
        'tmplKeys': 'common/constants/templateKeys',
        'jqScrollbar': 'ext/jquery.scrollbar.min',
        'select2': 'ext/select2',
        'angular-select2': 'ext/edited/angular-select2',
        'datatables': "ext/jquery.dataTables",
        'angular-datatables': "ext/angular-datatables",
        'angular-datatables.bootstrap': 'ext/angular-datatables.bootstrap',
        'ng-tags-input': 'ext/ng-tags-input',
        'slick': 'ext/slick.min'
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
        },
        underscore: {
            exports: '_'
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        'angular-strap': {
            deps: ['jquery', 'angular']
        },
        'angular-strap.tpl': {
            deps: ['jquery', 'angular', 'angular-strap']
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        'jqScrollbar': {
            deps: ['jquery', 'angular']
        },
        'select2': {
            deps: ['jquery']
        },
        'angular-select2': {
            deps: ['jquery', 'select2', 'angular']
        },
        'datatables': {
            deps: ['jquery']
        },
        'angular-datatables': {
            deps: ['jquery', 'angular', 'datatables']
        },
        'angular-datatables.bootstrap': {
            deps: ['jquery', 'angular', 'datatables', 'angular-datatables']
        },
        'ng-tags-input': {
            deps: ['angular']
        },
        'slick': {
            deps: [
                'jquery'
            ]
        }
    },
    waitSeconds: 200,
    deps: [
        'app'
    ],
    packages: [

    ]
});