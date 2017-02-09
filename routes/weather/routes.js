/**
 * Created by Hey on 3 Feb 2017
 */

var format = require("string-format");

var APPID_KEY = "appid";
var APPID = process.env.OWM_APPID || "";

var routes = {
    "/byLatLon": {
        "method": "get",
        "fn": function (req, res, next) {
            'use strict';
            res.send(JSON.stringify(
                {
                    "lat": req.query.lat,
                    "lon": req.query.lon
                }
            ));
        }
    }
};

module.exports = routes;