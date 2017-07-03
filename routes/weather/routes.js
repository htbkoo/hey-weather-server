/**
 * Created by Hey on 3 Feb 2017
 */

var format = require("string-format");
var httpFetcher = require("./httpFetcher");
var envVarRetriever = require("./envVarRetriever");

var APPID_KEY = "appid";
var getOWM_APPID = function () {
    "use strict";
    return envVarRetriever.getProcessEnvVar("OWM_APPID") || "";
};

var routes = {
    "/byLatLon": {
        "method": "get",
        "fn": function (req, res, next) {
            'use strict';
            var lat = req.query.lat;
            var lon = req.query.lon;

            httpFetcher.fetchUrl(format("http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}", lat, lon, getOWM_APPID()), function (data) {
                var callback = req.query.callback;
                if (typeof callback !== "undefined") {
                    data = format("/**/{}({})", callback === "?" ? "" : callback, data);
                }
                res.send(data);
            });
        }
    }
};

module.exports = routes;