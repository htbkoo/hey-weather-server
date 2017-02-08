/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');

var router_util = require('../router_util');

describe("hey-weather-server", function () {
    "use strict";
    describe("Router Util", function () {
        it("should added routes to router", function () {
            // Given
            var someRoutes = {
                "somePath": {
                    'method': "someMethod",
                    "fn": "a"
                },
                "somePath2": {
                    'method': "someMethod2",
                    "fn": "b"
                }
            };
            var triggered = {
                someMethod: false,
                someMethod2: false
            };

            var router = {
                'someMethod': function (path, fn) {
                    Test.expect(path).to.equal("somePath");
                    Test.expect(fn).to.equal("a");
                    triggered.someMethod = true;
                },
                'someMethod2': function (path, fn) {
                    Test.expect(path).to.equal("somePath2");
                    Test.expect(fn).to.equal("b");
                    triggered.someMethod2 = true;
                }
            };

            // When
            router_util.routerAddAllRoutes(router, someRoutes);

            // Then
            [
                "someMethod",
                "someMethod2"
            ].forEach(function (key) {
                Test.expect(triggered[key]).to.equal(true, format("Expect triggered.{} to be true", key));
            });
        });
    });
});
