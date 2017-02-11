/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');

var envVarRetriever = require('../envVarRetriever');

describe("hey-weather-server", function () {
    "use strict";
    describe("envVarRetriever for weather", function () {
        var original_process_env_OWM_APPID;
        beforeEach(function () {
            original_process_env_OWM_APPID = process.env.OWM_APPID;
            process.env.OWM_APPID = "hidden_but_true_id";
        });

        afterEach(function () {
            if (typeof original_process_env_OWM_APPID !== "undefined") {
                process.env.OWM_APPID = original_process_env_OWM_APPID;
            } else {
                delete process.env.OWM_APPID;
            }
        });

        it("should have a method getProcessEnvVar", function () {
            // Given

            // When

            // Then
            Test.expect(envVarRetriever.getProcessEnvVar).to.be.a('function');
        });

        it("should be able to get given process.env.OWM_APPID", function () {
            // Given

            // When
            var appid = envVarRetriever.getProcessEnvVar("OWM_APPID");

            // Then
            Test.expect(appid).to.equal("hidden_but_true_id");
        });
    });
});
