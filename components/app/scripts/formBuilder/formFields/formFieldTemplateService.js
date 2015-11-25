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

        return ['FORM_FIELD_CONSTANTS', function (CONSTANTS) {
            var _templateMap = {};
            _templateMap[CONSTANTS.text] = textField;
            _templateMap[CONSTANTS.email] = emailField;
            _templateMap[CONSTANTS.date] = dateField;
            _templateMap[CONSTANTS.time] = timeField;
            _templateMap[CONSTANTS.dateTime] = dateTimeField;
            _templateMap[CONSTANTS.url] = urlField;
            _templateMap[CONSTANTS.singleSelect] = singleSelectField;
            _templateMap[CONSTANTS.multiSelect] = multiSelectField;
            _templateMap[CONSTANTS.checkbox] = checkboxField;
            _templateMap[CONSTANTS.textArea] = textAreaField;

            this.getTemplate = function(type) {
                return _templateMap[type];
            };

            this.setTemplate = function(type, tmpl) {
                _templateMap[type] = tmpl;
            };
        }];
});
