const knex = require('knex');
const { config } = require('../db/knex');
const { knexCamelCaseMappers } = require('../db/helpers');

const environment = process.env.NODE_ENV || 'development';

const Database = knex({
  ...config[environment],
  ...knexCamelCaseMappers(),
});

const checkConnection = () => new Promise(async (resolve, reject) => {
  try {
    await Database('newsletter').select().limit(1);
    console.log('🔓 Connection Sql Up');
    resolve(true);
  } catch (error) {
    reject(new Error(`🔒 Error Connection Sql => ${error.message}`));
  }
});

const saveEmailUser = emailUser => {
  return new Promise(async (resolve, reject) => {
    Database('newsletter').insert({ email: emailUser })
    .then(() => resolve())
    .catch(() => reject())
  });
};

const saveUser = contact => {
  return new Promise(async (resolve, reject) => {
    Database('contact').insert({
      nom: contact.lastName,
      prenom: contact.firstName,
      ville: contact.city,
      email: contact.email,
      telephone: contact.phoneNumber,
      message: contact.message,
      // date: contact.messageDate
    })
    .then(() => resolve())
    .catch(() => reject())
  });
};

const saveCart = cart => {
  return new Promise(async (resolve, reject) => {
    Database('shop').insert({ 
      nom: cart.lastName,
      prenom: cart.firstName,
      ville: cart.city,
      email: cart.email,
      telephone: cart.phoneNumber,
      genre: cart.gender,
      nombre_tshirt: cart.itemNumber,
    })
    .then(() => resolve())
    .catch(() => reject())
  });
};

const saveReservation = event => {
  return new Promise(async (resolve, reject) => {
    Database('event').insert({
      nom: event.lastName,
      prenom: event.firstName,
      ville: event.city,
      email: event.email,
      telephone: event.phoneNumber,
      evenement: event.eventTitle,
      nombre_ticket: event.nbreTicket,
      type: event.eventType,
    })
    .then(() => resolve())
    .catch(() => reject())
  });
}


module.exports = { checkConnection, saveEmailUser, saveUser, saveCart, saveReservation };


