const config = {
  development: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
  },
};

module.exports = { config };
