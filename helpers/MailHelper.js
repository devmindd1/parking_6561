const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail');

class MailHelper{
    constructor(){
        this.transporter = nodeMailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            auth: {
                user: mailConfig.auth.user,
                pass: mailConfig.auth.pass,
            }
        });
    }

    sendMail(to, subject, text){
        return this.transporter.sendMail({
            from: `${mailConfig.fromName} <${mailConfig.from}>`,
            to: `<${to}>`,
            subject: subject,
            text: text,
        });
    }
}

module.exports = new MailHelper();
