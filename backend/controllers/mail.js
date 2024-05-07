const nodemailer = require('nodemailer');

const {sql } = require('../database');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.MAILER_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_UID,
        pass: process.env.MAILER_PASS
    }
})

const mailControllers = {};

mailControllers.sendTo = (mailId, sub, content) => {
    var mailOptions = {
        from: process.env.MAILER_UID,
        to: mailId,
        subject: sub,
        html: content
    }
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.log(error);
            return { success: false }
          } else {
            return { success: true }
          }
    })
}

mailControllers.sendMail = async (req, res) => {
    mailId = req.body.email;
    var query = await sql`
        select 
        email 
        from users 
        where email = ${mail}
    `;
    if(!query.length) {
        res.status(300).send('The email is not registered');
    } else {
        const result = this.sendTo(
            mailId,
            'Rent alert',
            `<p>Hello User!!!</p>
            <p>This is a reminder regarding your rent due for this month.</p>
            <p>Ignore if already paid.</p>
            `
        );
        if (result.success) {
            res.status(200).send();
          } else {
            res.status(300).send();
          }
    }
}

module.exports = mailControllers;