/**
 * Created by Hey on 3 Feb 2017
 */

var Test = require('chai');
var format = require('string-format');
var sinon = require('sinon');

var http = require('http');
var PassThrough = require('stream').PassThrough;

var httpFetcher = require('../httpFetcher');

describe("hey-weather-server", function () {
    "use strict";
    describe("httpFetcher for weather", function () {
        var stubHttpGet;

        beforeEach(function () {
            stubHttpGet = sinon.stub(http, 'get');
        });

        afterEach(function () {
            http.get.restore();
        });

        it("should have a method fetchUrl", function () {
            // Given

            // When

            // Then
            Test.expect(httpFetcher.fetchUrl).to.be.a('function');
        });

        it("should fetchUrl and get 200 mockResponse and handled by callback", sinon.test(function (done) {
            // Given
            var expectedResponseMessage = {
                "coord": {"lon": 139, "lat": 35},
                "sys": {"country": "JP", "sunrise": 1369769524, "sunset": 1369821049},
                "weather": [{"id": 804, "main": "clouds", "description": "overcast clouds", "icon": "04n"}],
                "main": {"temp": 289.5, "humidity": 89, "pressure": 1013, "temp_min": 287.04, "temp_max": 292.04},
                "wind": {"speed": 7.31, "deg": 187.002},
                "rain": {"3h": 0},
                "clouds": {"all": 92},
                "dt": 1369824698,
                "id": 1851632,
                "name": "Shuzenji",
                "cod": 200
            };
            var mockIncomingMessage = createMockIncomingMessageWithContentAndStatusCode(JSON.stringify(expectedResponseMessage), 200);

            var url = "someCorrectUrl?param1=a&param2=b";
            stubHttpGet.withArgs(url).callsArgWith(1, mockIncomingMessage).returns(stubHttpGet);

            // When
            httpFetcher.fetchUrl(url, callbackOnResponseAndAssert);

            // Then
            function callbackOnResponseAndAssert(data) {
                Test.expect(data).to.equal(JSON.stringify(expectedResponseMessage));
                done();
            }
        }));

        it("should fetchUrl and get 401 mockResponse and handled by callback", sinon.test(function (done) {
            // Given
            var expectedResponseMessage = {
                "cod": 401,
                "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
            };
            var mockIncomingMessage = createMockIncomingMessageWithContentAndStatusCode(JSON.stringify(expectedResponseMessage), 401);

            var url = "someWrongUrl?param1=a&param2=b";
            stubHttpGet.withArgs(url).callsArgWith(1, mockIncomingMessage).returns(stubHttpGet);

            // When
            httpFetcher.fetchUrl(url, callbackOnResponseAndAssert);

            // Then
            function callbackOnResponseAndAssert(data) {
                Test.expect(data).to.equal(JSON.stringify(expectedResponseMessage));
                done();
            }
        }));

        function createMockIncomingMessageWithContentAndStatusCode(strContent, statusCode) {
            var response = new PassThrough();
            response.write(strContent);
            response.statusCode = statusCode;
            response.end();
            return response;
        }
    });
});
