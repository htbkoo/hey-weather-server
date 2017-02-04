/**
 * Created by Hey on 3 Feb 2017
 */

var format = require("string-format");

var routes = {
    "/": {
        "method": "get",
        "fn": function (req, res, next) {
            /* GET users listing. */
            'use strict';
            var usage_response_message = format('Usage: {}', [
                "/weather/search/?query=(query)&callback=(callback)",
                "/weather/search/?lattlong=(latt),(long)&callback=(callback)",
                "/weather/location/(woeid)/"
            ].reduce(function (prev, curr) {
                if (prev === "") {
                    return curr;
                } else {
                    return format("{}  \t OR \t {}", prev, curr);
                }
            }, ""));

            res.send(usage_response_message);
        }
    }
};

module.exports = routes;