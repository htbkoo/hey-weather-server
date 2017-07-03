/**
 * Created by Hey on 11 Feb 2017
 */

module.exports = {
    "getProcessEnvVar": function(key){
        "use strict";
        return process.env[key];
    }
};