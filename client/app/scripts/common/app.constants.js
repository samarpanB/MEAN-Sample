define(['angularAMD', 'tmplKeys', 'common/constants/errorCodes'],
    function (angularAMD, templateKeys, errorCodes) {
        'use strict';
        angularAMD.constant('constants', {
        	dateFormat: "dd/MM/yyyy",
            dateTimeFormat: "dd/MM/yyyy hh:mma",
            TemplateKeys: templateKeys,
            errorCodes: errorCodes
        });
});
