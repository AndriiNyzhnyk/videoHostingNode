const nodemailer = require('nodemailer');
const security = require('./security/securityKey');
const validator = require("email-validator");

async function init(data) {
    try {
        let result = await validData(data);
        
        if(result === 'ok') {
            let text = await createStringForUser(data);
            result = await sendEmail(text);
        }

        return result;
        
    } catch (e) {
        console.error(e);
        return e;
    }
}

function validData(data) {
    return new Promise( (resolve, reject) => {
        if( (data.name !== '') && (data.subject !== '') && validator.validate(data.email)) {
            resolve('ok');
        } else {
            reject('some field is not correct')
        }
    });
}

function createStringForUser(data) {
    return new Promise( (resolve) => {
        let textMessage = '';

        for(key in data) {
            textMessage += key + ' : ' + data[key] + ';\n'
        }

        resolve(textMessage);
    });
}

function sendEmail(text) {
    return new Promise( (resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: security.emailLogin,
                pass: security.emailPassword
            }
        });

        let mailOptions = {
            from: security.emailLogin,
            to: security.testUserEmail,
            subject: 'Sending Email using Node.js',
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve('ok');
            }
        });

        
    });
}

module.exports = init;