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

const sendMartinusEmail = (emailUser, type) => {
  console.log('type : ', type)
  return new Promise((resolve, reject) => {
    const newsletterOptions = {
      title: 'Vous avez une nouvelle d‘inscription à la newsletter',
      text: 'Inscripton à la newsletter',
      subject: 'Inscription newsletter',
    }
    const contactOptions = {
      title: 'Vous avez une nouvelle demande de contact',
      text: 'Vous avez une nouvelle demande de contact',
      subject: 'Nouveau contact'
    };
    const shopOptions = {
      title: 'Vous avez une nouvelle commande de t-shirt de :',
      text: 'Visualisez votre nouvelle commande.',
      subject: 'Commande en attente',
    }

    let options = {title: '', text: '', subject: ''}
    switch(type) {
      case 'newsletter': newsletterOptions; break;
      case 'contact': contactOptions; break;
      case 'shop': shopOptions; break;
    }

    const mailOptions = {
      from: "Contact depuis le site :" + emailUser,
      to: `${dev}, ${contact}`,
      subject: `${options.subject}`,
      text: `${options.text}`,
      html: `<p>${options.title}</p><h3>Email du contact</h3><ul><li>Email : ${emailUser}</li></ul>`,
    };
    transporter.sendMail(mailOptions, error => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

const sendUserEmail = (emailUser ,type) => {
  return new Promise((resolve, reject) => {
    const newsletterOption = 'Merci de nous avoir contactés ! Le prochain numéro de la newsletter vous sera adressé par email';
    const contactOption = `Votre message a bien été envoyé. Un membre de l'équipe de l'association Martinu's prendra contact avec vous.`;
    const shopOption = `Votre commande est entre de bonnes mains et l'équipe entière vous remercie.
      Un membre de l'association vous contacte rapidement pour vous faire parvenir votre commande.`;

    let option = '';
    switch(type) {
      case 'newsletter': newsletterOption; break;
      case 'contact': contactOption; break;
      case 'shop': shopOption; break;
    }

    const mailOptions = {
      from: contact,
      to: emailUser,
      subject: `Demande envoyée avec succès.`,
      text: `<p>${option}</p>`,
    };
    transporter.sendMail(mailOptions, error => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

module.exports = { sendMartinusEmail, sendUserEmail };