var express = require('express');
var router = express.Router();
var routes = require('./weather/routes');

Object.keys(routes)
    .forEach(function (path) {
        "use strict";
        var route = routes[path];
        router[route.method](path, route.fn);
    });

module.exports = router;
