define(['angularAMD', 'common/globalData/systemData'], function (angularAMD, systemData) {
	'use strict';
    angularAMD.value('globals', {
      	loggedInUser: null,
      	systemData: systemData
    });
});