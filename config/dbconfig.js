require('dotenv').config();
var node_env = process.env.MODE;

var con ={};
if(node_env == 'DEV'){
  console.log('Local Data Base');
    con = {
        HOST: "localhost",
        USER: "ekaxyxz",
        PASSWORD: "beaconxyzz",
        DB: "beaconxyzz",
        dialect: "postgres",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      };
      
} else{
  console.log('Production Data Base');
  con = {
    HOST: "beaconxyzz",
    USER: "ekasta",
    PASSWORD: "beaconxyzz",
    DB: "beaconxyzz",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
}
  
  module.exports = {
'con':con
};