var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    'use strict';
    res.render('index', {title: 'hey-weather-server'});
});

module.exports = router;
