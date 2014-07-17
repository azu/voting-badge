"use strict";
var assert = require("power-assert");
var server = require("../lib/api-server");
var request = require("request");
var db = require("../lib/db-manager");
var api = require("../lib/vote-api");
var badge = require("../lib/badge-service");
describe("server", function () {
    var baseURL = 'http://localhost:3000';
    var key = "http://example.com/";
    var initialValue = 0;
    before(function () {
        server();
    });
    beforeEach(function (done) {
        db.del(key, done);
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
                assert(body === badge(initialValue));
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
    });
});