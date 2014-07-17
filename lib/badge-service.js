"use strict";
function createBadgeURL(count) {
    return "http://img.shields.io/badge/+1-" + count + "-red.svg?style=flat"
}
module.exports = createBadgeURL;