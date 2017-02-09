/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');
var sinon = require('sinon');

var routes = require('../routes');
var httpFetcher = require('../httpFetcher');

describe("hey-weather-server", function () {
    "use strict";
    describe("Routes for weather", function () {
        describe("/byLatLon", function () {
            var path = '/byLatLon';
            it("should check existence for '/byLatLon'", function () {
                // Given

                // When

                // Then
                Test.expect(path in routes).to.equal(true, format("Path '{}' should exist", path));
                var route_root = routes[path];
                Test.expect(route_root.method).to.equal('get', format("Path '{}' should support get request", path));

            });

            it("should get weather info without callback by lat,lon for '/byLatLon'", function (done) {
                // Given
                var route_root = routes[path];
                var mock_req = {
                    query: {
                        "lat": 35,
                        "lon": 139
                    }
                };
                var mock_res = {
                    send: sendAndAssert
                };
                var usage_response_message =
                    JSON.stringify({
                        "coord": {"lon": 139, "lat": 35},
                        "sys": {"country": "JP", "sunrise": 1369769524, "sunset": 1369821049},
                        "weather": [{
                            "id": 804,
                            "main": "clouds",
                            "description": "overcast clouds",
                            "icon": "04n"
                        }],
                        "main": {
                            "temp": 289.5,
                            "humidity": 89,
                            "pressure": 1013,
                            "temp_min": 287.04,
                            "temp_max": 292.04
                        },
                        "wind": {"speed": 7.31, "deg": 187.002},
                        "rain": {"3h": 0},
                        "clouds": {"all": 92},
                        "dt": 1369824698,
                        "id": 1851632,
                        "name": "Shuzenji",
                        "cod": 200
                    });

                // When
                route_root.fn(mock_req, mock_res);

                // Then
                function sendAndAssert(message) {
                    Test.expect(message).to.equal(JSON.stringify(
                        {
                            "lat": 35,
                            "lon": 139
                        }
                    ));
                    done();
                }
            });
        });
    });
});
