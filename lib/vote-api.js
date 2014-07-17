"use strict";
var db = require("./db-manager");
var levelIncr = require("level-incr");
var Promise = require("bluebird");
var incrDB = levelIncr(db, 0);
/**
 * return voting count promise
 * @param {string} url target URL string
 */
function getCount(url) {
    return new Promise(function (resolve, reject) {
        db.get(url, function (error, value) {
            if (error) {
                reject(error);
            } else {
                var num = parseInt(value, 10);
                if (isNaN(num)) {
                    reject(num);
                } else {
                    resolve(num);
                }
            }
        });
    });
}
/**
 * +1 for url
 * return promise
 * @param {string} url target URL string
 */
function vote(url) {
    return new Promise(function (resolve, reject) {
        incrDB.incr(url, function (error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });

}
module.exports = {
    getCount: getCount,
    vote: vote
};