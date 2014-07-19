"use strict";
var assert = require("power-assert");
var server = require("../lib/api-server");
var request = require("request");
var backend = require("../lib/backend/backend-switcher").currentBackEnd;
var api = require("../lib/vote-api");
var badge = require("../lib/badge-service");
describe("server", function () {
    var baseURL = 'http://localhost:3000';
    var key = "http://example.com/";
    var initialValue = 0;
    before(function (done) {
        server(function () {
            backend.ready(function (error) {
                done(error);
            })
        });
    });
    beforeEach(function (done) {
        backend.delKey(key, done);
    });
    describe("/count", function () {
        it("should return count initial value", function (done) {
            request.get(baseURL + "/count?url=" + key, function (error, response, body) {
                assert(body === String(initialValue));
                done(error);
            });
        });
    });
    describe("/img", function () {
        it("should return badge image url", function (done) {
            request.get(baseURL + "/img?url=" + key, function (error, response, body) {
                assert(response.request.redirects.length > 0);
                assert(response.request.redirects[0].redirectUri.indexOf(badge(initialValue)) !== -1);
                done(error);
            });
        });
    });
    describe("/vote", function () {
        it("count up +1", function (done) {
            request.get(baseURL + "/vote?url=" + key, function (error, response, body) {
                api.getCount(key).then(function (value) {
                    assert(value === 1);
                }).then(done, done);
            });
        });
        context("when no referrer", function () {
            it("should Nice vote", function (done) {
                request.get(baseURL + "/vote?url=" + key, function (error, response, body) {
                    assert(body === "Nice Vote!");
                    done(error);
                });
            });
        });
        context("when has referrer", function () {
            it("redirect to back", function (done) {
                var referrer = "http://example.com/";
                var options = {
                    url: baseURL + "/vote?url=" + key,
                    headers: {
                        'referrer': referrer,
                        'User-Agent': 'request'
                    }
                };
                request.get(options, function (error, response, body) {
                    assert(response.request.redirects.length > 0);
                    assert(response.request.redirects[0].redirectUri === referrer);
                    done(error);
                });
            });
        });
    });
});