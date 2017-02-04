/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');

var routes = require('../routes');

describe("hey-weather-server", function () {
    "use strict";
    describe("Routes for weather", function () {
        it("should get response about usage for '/'", function (done) {
            // Given
            Test.expect('/' in routes).to.equal(true, "Path '/' should exist");
            var route_root = routes['/'];
            Test.expect(route_root.method).to.equal('get', "Path '/' should support get request");

            // When
            var mock_res = {
                send: function (message) {
                    // Then
                    var usage_response_message = "Usage: /weather/search/?query=(query)&callback=(callback)  	 OR 	 /weather/search/?lattlong=(latt),(long)&callback=(callback)  	 OR 	 /weather/location/(woeid)/";
                    Test.expect(message).to.equal(usage_response_message);
                    done();
                }
            };
            route_root.fn({}, mock_res);

        });
    });
});
