"use strict";
var assert = require("power-assert");
var shouldFulfilled = require("promise-test-helper").shouldFulfilled;
var shouldRejected = require("promise-test-helper").shouldRejected;
var api = require("../lib/vote-api");
var backend = require("../lib/backend/backend-switcher").currentBackEnd;
describe("vote-api", function () {
    var key = "http://example.com/";
    beforeEach(function (done) {
        backend.delKey(key, done);
    });
    describe("getCount", function () {
        context("when no data", function () {
            it("should return 0", function () {
                return shouldFulfilled(api.getCount(key)).then(function (value) {
                    assert(value === 0);
                })
            });
        });
        context("when has data", function () {
            var expectedValue = 1;
            beforeEach(function (done) {
                backend.putKey(key, expectedValue, function (error) {
                    done(error);
                });
            });
            it("should return count", function () {
                return shouldFulfilled(api.getCount(key)).then(function (value) {
                    assert(value === expectedValue);
                })
            });
        });
    });
    describe("vote", function () {
        context("when no data", function () {
            it("up count to 1", function () {
                var result = api.vote(key).then(function () {
                    return api.getCount(key);
                });
                return shouldFulfilled(result).then(function (value) {
                    assert(value === 1);
                });
            });
        });
        context("when count is 99", function () {
            var currentValue = 99;
            beforeEach(function (done) {
                backend.putKey(key, currentValue, function (error) {
                    done(error);
                });
            });
            it("up count to 100", function () {
                var result = api.vote(key).then(function () {
                    return api.getCount(key);
                });
                return shouldFulfilled(result).then(function (value) {
                    assert(value === currentValue + 1);
                })
            });
        });
    });
});