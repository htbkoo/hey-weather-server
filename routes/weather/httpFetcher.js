/**
 * Created by Hey on 9 Feb 2017
 */

var http = require('http');

module.exports = {
    "fetchUrl": function (url, callback) {
        "use strict";
        http.get(url, function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                callback(data);
            });
        }).on('error', function (err) {
            var data = {};
            data.statusCode = getIfDefinedOrDefault(err.statusCode, 500);
            data.message = getIfDefinedOrDefault(err.message, "Unknown Error");
            try {
                data.details = JSON.stringify(err);
            } catch (ignore) {
                // TODO: replace by proper logging
                console.log("Failed to parse err due to: " + ignore.message);
            }
            callback(data);
        });

        function getIfDefinedOrDefault(definable, def) {
            return (typeof (definable) === "undefined") ? def : definable;
        }
    }
};