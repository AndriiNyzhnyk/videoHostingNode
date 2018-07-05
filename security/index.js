const bcrypt = require('bcrypt');
const security = require('./securityKey');

let salt1 = bcrypt.genSaltSync(10);
let salt2 = bcrypt.genSaltSync(10);

let hashPassword = bcrypt.hashSync(security.adminKey, salt1);
let hashLogin = bcrypt.hashSync(security.adminLogin, salt2);

function compareData(login, password) {
    let bool1 = bcrypt.compareSync(login, hashLogin);
    let bool2 = bcrypt.compareSync(password, hashPassword);

    if(bool1 === true && bool2 === true) {
        return "ok"
    } else {
        return "bad"
    }
}

module.exports = compareData;