"use strict";
var levelup = require('levelup');
var dbPath = "./db.db";
var Promise = require("bluebird");
module.exports = levelup(dbPath);
module.exports.destroy = function () {
    return new Promise(function (resolve, reject) {
        require('leveldown').destroy(dbPath, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
};
