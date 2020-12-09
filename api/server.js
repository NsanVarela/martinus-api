const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const router = express.Router()
const config = require("../environments/environment")
const transporter = require('./services/mail.service')

const dev = config.hosting.DEV
const contact = config.hosting.CONTACT
const sebastien = config.hosting.SEBASTIEN
const deivid = config.hosting.DEIVID

router.route('/')
.all(function(req,res) { 
  res.json({ 
    message : `Bienvenue sur notre Martinus API `,
    methode : req.method
  })
});

router.route('/newsletter')
.post(function(req,res) {
  console.log(`From Website on newsletter : `, req.body)

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
        status: 'fail'
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
  console.log(`From Website on contact : `, req.body)

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
        status: 'fail'
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

router.route(`/event`)
.post(function(req, res) {
  res.json({
    message : `Ajoute un/des participant(s) à un event Martinus`,
    eventId: req.body.id,
    name : req.body.name,
    firstname : req.body.firstname,
    count : req.body.count,
    methode: req.method
  })
})

router.route('/shop')
.post(function(req, res) {
  res.json({
    message : `Demande un article du shop Martinus`,
    itemId: req.body.id,
    name : req.body.name,
    firstname : req.body.firstname,
    count : req.body.count,
    email: req.body.email,
    methode: req.method
  })
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})