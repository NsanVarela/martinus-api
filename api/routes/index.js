const express = require('express');
const router = express.Router();
const { sendMartinusEmail, sendUserEmail } = require('../services/mail.service');
const { saveEmailUser, saveUser, saveCart, saveReservation } = require('../services/db.service');

router.post('/newsletter', async (req,res) => {
  const emailUser = req.body.contact.email;
  try {
    await saveEmailUser(emailUser);
    await sendMartinusEmail(emailUser, 'newsletter');
    await sendUserEmail(emailUser, 'newsletter');
    res.json({ status: 'success', message: `Merci, votre email nous servira à vous adresser la prochaine newsletter !` });
  } catch (error) {
    res.json({ status: 'warning', message: `Une erreur est survenue !` });
  }
});

router.post('/contact', async (req,res) => {
  const user = req.body.contact;
  const emailUser = req.body.contact.email;
  const firstNameUser = req.body.contact.firstName;
  try {
    await saveUser(user);
    await sendMartinusEmail(emailUser, 'contact');
    await sendUserEmail(emailUser, 'contact');
    res.json({ status: 'success', message: `Merci ${firstNameUser}, votre message est envoyé avec succès !` });
  } catch (error) {
    res.json({ status: 'warning', message: `Une erreur est survenue !` });
  }
});

router.post('/shop', async (req,res) => {
  const cart = req.body.cart;
  const emailUser = req.body.cart.email;
  const firstNameUser = req.body.cart.firstName;
  try {
    await saveCart(cart);
    await sendMartinusEmail(emailUser, 'shop');
    await sendUserEmail(emailUser, 'shop');
    res.json({ status: 'success', message: `Merci ${firstNameUser}, votre commande est envoyée avec succès !` });
  } catch (error) {
    res.json({ status: 'warning', message: `Une erreur est survenue ${error}!` });
  }
});

router.post('/event', async (req, res) => {
  console.log('In', req.body.event);
  const event = req.body.event;
  const emailUser = req.body.event.email;
  const firstNameReservation = req.body.event.firstName;
  try {
    await saveReservation(event);
    await sendMartinusEmail(emailUser, 'event');
    await sendUserEmail(emailUser, 'event');
    res.json({ status: 'success', message: `Merci ${firstNameReservation}, votre réservation est envoyée avec succès !` });
  } catch (error) {
    res.json({ status: 'warning', message: `Une erreur est survenue ${error}!` });
  }
})

// router.route('/contact')
// .post(function(req,res) {
//   // console.log(`From Website on contact : `, req.body)
//   const output = `
//     <p>Vous avez une nouvelle demande de contact</p>
//     <h3>Détails du contact</h3>
//     <ul>
//       <li>Nom : ${req.body.contact.lastName}</li>
//       <li>Prénom : ${req.body.contact.firstName}</li>
//       <li>Ville : ${req.body.contact.city}</li>
//       <li>Email : ${req.body.contact.email}</li>
//       <li>Téléphone : ${req.body.contact.phoneNumber}</li>
//     </ul>
//     <h3>Message</h3>
//     <p>${req.body.contact.message}</p>
//   `;
//   const mailOptions = {
//     from: "Contact depuis le site :" + req.body.contact.email,
//     to: `${dev}, ${contact}`,
//     subject: `Node Contact Request`,
//     text: `Hello world?`,
//     html: output,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.json({
//         status: 'warning',
//         message: `Une erreur est survenue !`
//       })
//     }  else {
//       // console.log(`Message sent: %s ${info.messageId}`);
//       // Preview only available when sending through an Ethereal account
//       // console.log(`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`);
//       res.json({
//         status: 'success',
//         message: `Merci ${req.body.contact.firstName}, votre email est envoyé avec succès !`
//       })
//     }
//     transporter.sendMail({
//       from: contact,
//       to: req.body.contact.email,
//       subject: `Email envoyé avec succès.`,
//       text: ` Merci de nous avoir contactés ${req.body.contact.firstName}! 
//         Dès que nous prendrons connaissance de votre message, un membre de l'équipe reviendra vers vous.`
//     }, function(error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Message sent: ' + info.response);
//       }
//     })
//   });
// });

module.exports = router;
