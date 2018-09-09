const nodemailer = require('nodemailer');
const security = require('./security/securityKey');

module.exports = () => {
    
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
        text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
};