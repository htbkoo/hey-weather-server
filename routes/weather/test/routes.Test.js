/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');
var sinon = require('sinon');

var routes = require('../routes');
var httpFetcher = require('../httpFetcher');
var envVarRetriever = require('../envVarRetriever');

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

            it("should get weather info without callback without APIKey by lat,lon for '/byLatLon'", sinon.test(function (done) {
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
                var someResponse = {
                    "cod": 401,
                    "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
                };
                this.stub(httpFetcher, "fetchUrl")
                    .withArgs(sinon.match(function (value) {
                        // example url: "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=hidden_but_true_id"
                        return [
                            "http://api.openweathermap.org/data/2.5/weather?",
                            "lat=" + mock_req.query.lat,
                            "lon=" + mock_req.query.lon
                        ].every(function (urlPart) {
                            return value.indexOf(urlPart) !== -1;
                        });
                    }))
                    .callsArgWith(1, JSON.stringify(someResponse));

                // When
                route_root.fn(mock_req, mock_res);

                // Then
                function sendAndAssert(message) {
                    Test.expect(message).to.equal(JSON.stringify(someResponse));
                    done();
                }
            }));

            it("should get weather info without callback by lat,lon for '/byLatLon' with APIKey", sinon.test(function (done) {
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
                var mock_appid = "hidden_but_true_id";
                var someResponse = {
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
                };
                this.stub(envVarRetriever, "getEnvVar")
                    .withArgs("OWM_APPID")
                    .returns(mock_appid);
                this.stub(httpFetcher, "fetchUrl")
                    .withArgs(sinon.match(function (value) {
                        // example url: "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=hidden_but_true_id"
                        return [
                            "http://api.openweathermap.org/data/2.5/weather?",
                            "lat=" + mock_req.query.lat,
                            "lon=" + mock_req.query.lon,
                            "appid=" + mock_appid
                        ].every(function (urlPart) {
                            return value.indexOf(urlPart) !== -1;
                        });
                    }))
                    .callsArgWith(1, JSON.stringify(someResponse));

                // When
                route_root.fn(mock_req, mock_res);

                // Then
                function sendAndAssert(message) {
                    Test.expect(message).to.equal(JSON.stringify(someResponse));
                    done();
                }
            }));

            it("should get weather info with callback by lat,lon for '/byLatLon' with APIKey", sinon.test(function (done) {
                // Given
                var route_root = routes[path];
                var mock_req = {
                    query: {
                        "lat": 35,
                        "lon": 139,
                        "callback": "myFunc"
                    }
                };
                var mock_res = {
                    send: sendAndAssert
                };
                var mock_appid = "hidden_but_true_id";
                var someResponse = {"field": "value"};
                this.stub(envVarRetriever, "getEnvVar")
                    .withArgs("OWM_APPID")
                    .returns(mock_appid);
                this.stub(httpFetcher, "fetchUrl")
                    .withArgs(sinon.match(function (value) {
                        // example url: "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=hidden_but_true_id"
                        return [
                            "http://api.openweathermap.org/data/2.5/weather?",
                            "lat=" + mock_req.query.lat,
                            "lon=" + mock_req.query.lon,
                            "appid=" + mock_appid
                        ].every(function (urlPart) {
                            return value.indexOf(urlPart) !== -1;
                        });
                    }))
                    .callsArgWith(1, JSON.stringify(someResponse));

                // When
                route_root.fn(mock_req, mock_res);

                // Then
                function sendAndAssert(message) {
                    Test.expect(message).to.equal(
                        format("/**/{}({})", mock_req.query.callback, JSON.stringify(someResponse))
                    );
                    done();
                }
            }));

            it("should get weather info with ? callback by lat,lon for '/byLatLon' with APIKey", sinon.test(function (done) {
                // Given
                var route_root = routes[path];
                var mock_req = {
                    query: {
                        "lat": 35,
                        "lon": 139,
                        "callback": "?"
                    }
                };
                var mock_res = {
                    send: sendAndAssert
                };
                var mock_appid = "hidden_but_true_id";
                var someResponse = {"field": "value"};
                this.stub(envVarRetriever, "getEnvVar")
                    .withArgs("OWM_APPID")
                    .returns(mock_appid);
                this.stub(httpFetcher, "fetchUrl")
                    .withArgs(sinon.match(function (value) {
                        // example url: "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=hidden_but_true_id"
                        return [
                            "http://api.openweathermap.org/data/2.5/weather?",
                            "lat=" + mock_req.query.lat,
                            "lon=" + mock_req.query.lon,
                            "appid=" + mock_appid
                        ].every(function (urlPart) {
                            return value.indexOf(urlPart) !== -1;
                        });
                    }))
                    .callsArgWith(1, JSON.stringify(someResponse));

                // When
                route_root.fn(mock_req, mock_res);

                // Then
                function sendAndAssert(message) {
                    Test.expect(message).to.equal(
                        format("/**/{}({})", "", JSON.stringify(someResponse))
                    );
                    done();
                }
            }));
        });
    });
});
