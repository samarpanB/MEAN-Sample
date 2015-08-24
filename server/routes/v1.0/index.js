var express = require('express');
var router = express.Router();

// User route paths
router.use('/users', require('./user'));

module.exports = router;
