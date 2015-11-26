define(['angular',
    'text!formBuilder/formFields/checkboxField.html',
    'text!formBuilder/formFields/dateField.html',
    'text!formBuilder/formFields/dateTimeField.html',
    'text!formBuilder/formFields/emailField.html',
    'text!formBuilder/formFields/multiSelectField.html',
    'text!formBuilder/formFields/singleSelectField.html',
    'text!formBuilder/formFields/textAreaField.html',
    'text!formBuilder/formFields/textField.html',
    'text!formBuilder/formFields/timeField.html',
    'text!formBuilder/formFields/urlField.html'],
    function (angular, checkboxField, dateField, dateTimeField, emailField, multiSelectField,
        singleSelectField, textAreaField, textField, timeField, urlField) {
        'use strict';
        return function () {
            function TemplateService(map) {
                var context = this,
                    _tmplMap = angular.copy(map);

                context.getTemplate = function(type) {
                    return _tmplMap[type];
                };

                context.setTemplate = function(type, tmpl) {
                    _tmplMap[type] = tmpl;
                };
            }

            this.templates = {};

            this.$get = ['FORM_FIELD_CONSTANTS', function (CONSTANTS) {
                var _defaultTmplMap = {},
                    _templateMap = {};
                _defaultTmplMap[CONSTANTS.text] = textField;
                _defaultTmplMap[CONSTANTS.email] = emailField;
                _defaultTmplMap[CONSTANTS.date] = dateField;
                _defaultTmplMap[CONSTANTS.time] = timeField;
                _defaultTmplMap[CONSTANTS.dateTime] = dateTimeField;
                _defaultTmplMap[CONSTANTS.url] = urlField;
                _defaultTmplMap[CONSTANTS.singleSelect] = singleSelectField;
                _defaultTmplMap[CONSTANTS.multiSelect] = multiSelectField;
                _defaultTmplMap[CONSTANTS.checkbox] = checkboxField;
                _defaultTmplMap[CONSTANTS.textArea] = textAreaField;
                _templateMap = angular.merge({}, _defaultTmplMap, this.templates);

        		return {
        			init: function (map) {
            			return map ? new TemplateService(map) :
                            new TemplateService(_templateMap);
            		}
        		};
            }];
        };
    });
