var express = require('express');
var router = express.Router();

var router_util = require('./util/router_util');
var routes = require('./index/routes');

router_util.routerAddAllRoutes(router, routes);

module.exports = router;
