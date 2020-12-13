const knex = require('knex');
const { config } = require('../db/knex');
const { knexCamelCaseMappers } = require('../db/helpers');

const environment = process.env.NODE_ENV || 'development';

console.log(environment);

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


module.exports = { checkConnection, saveEmailUser };
