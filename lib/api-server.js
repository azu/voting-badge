"use strict";
var express = require('express');
var api = require("./vote-api");
var app = express();
var badge = require("./badge-service");

app.use('/', express.static(__dirname + "/../public"));
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
    var style = req.query.style;
    var label = req.query.label;
    var color = req.query.color;
    if (url == null) {
        next(new Error("?url=xxx not found"));
    }
    api.getCount(url).then(function (value) {
        badge(value, style, label, color).then(function (svg) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader('Last-Modified', (new Date()).toUTCString());
            res.writeHead(200, {'Content-Type': 'image/svg+xml' });
            res.end(svg);
        });
    }).catch(next);
});
app.get("/vote", function (req, res, next) {
    var url = req.query.url;
    if (url == null) {
        next(new Error("?url=xxx not found"));
    }
    api.vote(url).then(function (value) {
        res.send("Nice Vote!");
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
