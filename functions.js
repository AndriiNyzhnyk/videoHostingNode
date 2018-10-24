const securityKey = require('./security/securityKey');

// function verify obj
module.exports.isEmptyObj = (obj) => {
    for(let key in obj) {
        return false;
    }
    return true;
};

module.exports.checkCookie = (req) => {
    return req.signedCookies.signedMonster === securityKey.myCookie;
};