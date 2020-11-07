const config = require("../../environments/environment")
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: config.hosting.HOST,
  port: config.hosting.PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.hosting.CONTACT, // generated ethereal user
    pass: config.hosting.C_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false // use false on local
  }
});

transporter.verify((error, success) => {
  if(error) {
    console.log('Erreur de mailer: ', error)
  } else {
    console.log('Le serveur est prêt à prendre les messages')
  }
});

module.exports = transporter