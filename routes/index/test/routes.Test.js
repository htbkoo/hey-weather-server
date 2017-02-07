/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');

var routes = require('../routes');

describe("hey-weather-server", function () {
    "use strict";
    describe("Routes for index", function () {
        it("should get response about usage for '/'", function (done) {
            // Given
            Test.expect('/' in routes).to.equal(true, "Path '/' should exist");
            var route_root = routes['/'];
            Test.expect(route_root.method).to.equal('get', "Path '/' should support get request");

            // When
            var mock_res = {
                render: function (templateName, options) {
                    // Then
                    Test.expect(templateName).to.equal("index", "For index page, template named as 'index' should be used");
                    [
                        'title'
                    ].forEach(function (key) {
                        Test.expect(options[key]).to.equal('hey-weather-server');
                    });

                    done();
                }
            };
            route_root.fn({}, mock_res);

        });
    });
});
