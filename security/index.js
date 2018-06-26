const bcrypt = require('bcrypt');
const security = require('./securityKey');

function compareData(login, password) {
    let bool1 = bcrypt.compareSync(login, security.hashLogin);
    let bool2 = bcrypt.compareSync(password, security.hashPassword);

    if(bool1 === true && bool2 === true) {
        return "ok"
    } else {
        return "bad"
    }
}

module.exports = compareData;