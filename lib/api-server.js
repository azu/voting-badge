"use strict";
var express = require('express');
var api = require("./vote-api");
var app = express();
var badge = require("./badge-service");
/**
 * /count?url=http://
 */
app.get("/count", function (req, res, next) {
    var url = req.query.url;
    if (url == null) {
        next(new Error("?url=xxx not found"));
    }
    api.getCount(url).then(function (value) {
        res.send(String(value));
    }).catch(next);
});

app.get("/img", function (req, res, next) {
    var url = req.query.url;
    if (url == null) {
        next(new Error("?url=xxx not found"));
    }
    api.getCount(url).then(function (value) {
        res.send(badge(value));
    }).catch(next);
});
var port = process.env.PORT || 3000;
module.exports = function () {
    app.listen(port, function () {
        console.log("Listening on " + port);
    });
};
