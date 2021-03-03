const dbconfig = require('../config/dbconfig.js').con; // get connection configurations
const Sequelize = require("sequelize");   // load the module
// console.log(dbconfig);
// Initialize sequilize connection
  const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  logging: false,

  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle
  }
});


sequelize.sync(); 
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.orderDelivery = require("./orderDelivery.model.js")(sequelize, Sequelize);
db.logisticsitems = require("./logisticsitems.model.js")(sequelize, Sequelize);


module.exports = db;