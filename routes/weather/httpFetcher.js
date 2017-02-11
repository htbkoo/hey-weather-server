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
            res.on('end', function(){
                callback(data);
            });
        });
    }
};