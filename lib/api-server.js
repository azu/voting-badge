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
        res.redirect(badge(value));
    }).catch(next);
});
app.get("/vote", function (req, res, next) {
    var url = req.query.url;
    if (url == null) {
        next(new Error("?url=xxx not found"));
    }
    api.vote(url).then(function (value) {
        var backURL = req.header('Referer');
        if (backURL) {
            res.redirect(backURL);
        } else {
            res.send("Nice Vote!");
        }
    }).catch(next);
});


app.use(require("./api/error-handle"));

var port = process.env.PORT || 3000;
module.exports = function (callback) {
    app.listen(port, function () {
        console.log("Listening on " + port);
        if (callback) {
            callback(null);
        }
    });
};
