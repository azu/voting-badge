"use strict";
var Promise = require("bluebird");
var backend = require("./backend/backend-switcher").currentBackEnd;
/**
 * return voting count promise
 * @param {string} url target URL string
 */
function getCount(url) {
    return new Promise(function (resolve, reject) {
        backend.getKey(url, function (error, value) {
            if (error) {
                if (error.notFound) {
                    resolve(0);
                } else {
                    reject(error);
                }
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
        backend.incrementKey(url, function (error, value) {
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