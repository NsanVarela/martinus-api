const express = require('express');
const router = express.Router();
const { sendMartinusEmail, sendUserEmail } = require('../services/mail.service');
const { saveEmailUser, saveUser, saveCart, saveReservation } = require('../services/db.service');

router.get('/health', async (req,res) => {
    res.json({ status: 'success', message: `Hello` });
});

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

module.exports = router;
