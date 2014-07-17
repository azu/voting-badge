"use strict";
function createBadgeURL(count) {
    return "https://img.shields.io/badge/Vote:+1:-" + count + "-red.svg?style=flat"
}
module.exports = createBadgeURL;