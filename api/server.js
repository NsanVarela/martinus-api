const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
const config = require("../environments/environment");
const transporter = require('./services/mail.service');

const dev = config.hosting.DEV;
const contact = config.hosting.CONTACT;
const sebastien = config.hosting.SEBASTIEN;
const deivid = config.hosting.DEIVID;

router.route('/')
.all(function(req,res) { 
  res.json({ 
    message : `Bienvenue sur notre Martinus API `,
    methode : req.method
  })
});

router.route('/newsletter')
.post(function(req,res) {
  // console.log(`From Website on newsletter : `, req.body)
  const output = `
    <p>Vous avez une nouvelle d'inscription à la newsletter'</p>
    <h3>Email du contact</h3>
    <ul>
      <li>Email : ${req.body.contact.email}</li>
    </ul>
  `;
  const mailOptions = {
    from: "Contact depuis le site :" + req.body.contact.email,
    to: `${dev}, ${contact}`,
    subject: `Votre newsletter`,
    text: `Inscripton à la newsletter`,
    html: output,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        status: 'warning',
        message: `Une erreur est survenue !`
      })
    }  else {
      // console.log(`Message sent: %s ${info.messageId}`);
      // Preview only available when sending through an Ethereal account
      // console.log(`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`);
      res.json({
        status: 'success',
        message: `Merci, votre email nous servira à vous adresser la prochaine newsletter !`
      })
    }
    transporter.sendMail({
      from: contact,
      to: req.body.contact.email,
      subject: `Email envoyé avec succès.`,
      text: ` Merci de nous avoir contactés ! 
        Le prochain numéro de la newsletter vous sera adressé par email`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    })
  });
});

router.route('/contact')
.post(function(req,res) {
  // console.log(`From Website on contact : `, req.body)
  const output = `
    <p>Vous avez une nouvelle demande de contact</p>
    <h3>Détails du contact</h3>
    <ul>
      <li>Nom : ${req.body.contact.fullName}</li>
      <li>Prénom : ${req.body.contact.firstName}</li>
      <li>Ville : ${req.body.contact.city}</li>
      <li>Email : ${req.body.contact.email}</li>
      <li>Téléphone : ${req.body.contact.phoneNumber}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.contact.message}</p>
  `;
  const mailOptions = {
    from: "Contact depuis le site :" + req.body.contact.email,
    to: `${dev}, ${contact}`,
    subject: `Node Contact Request`,
    text: `Hello world?`,
    html: output,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        status: 'warning',
        message: `Une erreur est survenue !`
      })
    }  else {
      // console.log(`Message sent: %s ${info.messageId}`);
      // Preview only available when sending through an Ethereal account
      // console.log(`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`);
      res.json({
        status: 'success',
        message: `Merci ${req.body.contact.firstName}, votre email est envoyé avec succès !`
      })
    }
    transporter.sendMail({
      from: contact,
      to: req.body.contact.email,
      subject: `Email envoyé avec succès.`,
      text: ` Merci de nous avoir contactés ${req.body.contact.firstName}! 
        Dès que nous prendrons connaissance de votre message, un membre de l'équipe reviendra vers vous.`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    })
  });
});

router.route('/shop')
.post(function(req, res) {
  // console.log(`Commande de nouveaux articles : `, req.body)
  const output = `
    <h3>Vous avez une nouvelle commande de t-shirt de :</h3>
    <ul>
      <li>Nom : ${req.body.cart.fullName}</li>
      <li>Prénom : ${req.body.cart.firstName}</li>
      <li>Ville : ${req.body.cart.city}</li>
      <li>Email : ${req.body.cart.email}</li>
      <li>Téléphone : ${req.body.cart.phoneNumber}</li>
    </ul>
    <h3>Message</h3>
    <p>J'adore ces t-shirts, je souhaite commander ${req.body.cart.itemNumber} t-shirt(s) ${req.body.cart.gender} s'il vous plait.
    Merci de me contacter pour m'indiquer comment les récupérer.</p>
  `;
  const mailOptions = {
    from: "Contact depuis le site :" + req.body.cart.email,
    to: `${dev}, ${contact}`,
    subject: `Commande sur la boutique solidaire`,
    text: `Une nouvelle commande...`,
    html: output,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        status: 'fail'
      })
    }  else {
      // console.log(`Message sent: %s ${info.messageId}`);
      // Preview only available when sending through an Ethereal account
      // console.log(`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`);
      res.json({
        status: 'success',
        message: `Merci, votre commande est bien envoyée !`
      })
    }
    transporter.sendMail({
      from: contact,
      to: req.body.cart.email,
      subject: `Commande envoyé avec succès.`,
      text: ` Merci pour votre commande ! 
        Nous revenons rapidement vers vous pour y donner suite.`
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    })
  });
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});