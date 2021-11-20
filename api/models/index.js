const dbConfig = require("../../config.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.U_PASS, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max, // maximum number of connection in pool
        min: dbConfig.pool.min, // minimum number of connection in pool
        acquire: dbConfig.pool.acquire, // maximum time, in milliseconds, that a connection can be idle before being released
        idle: dbConfig.pool.idle // maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("./events.model.js")(sequelize, Sequelize);

module.exports = db;