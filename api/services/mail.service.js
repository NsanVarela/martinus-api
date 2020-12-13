const nodemailer = require('nodemailer');
const dev = process.env.DEV;
const contact = process.env.CONTACT;

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false,
  auth: {
    user: process.env.CONTACT,
    pass: process.env.C_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sendMartinusEmail = (emailUser, type = 'newsletter') => {
  return new Promise((resolve, reject) => {
    const titleNewsletter = 'Vous avez une nouvelle d‘inscription à la newsletter';
    const titleContact = 'Vous avez une nouvelle demande de contact';
    const titleShop = 'Vous avez une nouvelle commande de t-shirt de :';

    let title = '';
    switch(type) {
      case 'newsletter': title = titleNewsletter; break;
      case 'contact': title = titleContact; break;
      case 'shop': title = titleShop; break;
    }

    const mailOptions = {
      from: "Contact depuis le site :" + emailUser,
      to: `${dev}, ${contact}`,
      subject: `Votre newsletter`,
      text: `Inscripton à la newsletter`,
      html: `<p>${title}</p><h3>Email du contact</h3><ul><li>Email : ${emailUser}</li></ul>`,
    };
    transporter.sendMail(mailOptions, error => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

const sendUserEmail = emailUser => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: contact,
      to: emailUser,
      subject: `Email envoyé avec succès.`,
      text: ` Merci de nous avoir contactés ! 
        Le prochain numéro de la newsletter vous sera adressé par email`
    };
    transporter.sendMail(mailOptions, error => {
      if (error) reject(error);
      resolve(true);
    });
  });
};


module.exports = { sendMartinusEmail, sendUserEmail };