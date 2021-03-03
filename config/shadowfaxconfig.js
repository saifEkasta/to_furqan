require('dotenv').config();
var dunzo_env = process.env.S_MODE;
var s_con ={};
if(dunzo_env == 'DEV'){
    s_con.TOKEN = "4f33dbd351105a7519f4a8ae08aa9xuxyxyxy";
    s_con.CLIENT_CODE = "nearstore001";
    s_con.STATUS_URL = "http://hobbit.demo.shadowfax.in/api/v2/orders/9220102/status/";
    s_con.SERVICE_URL = "http://hobbit.demo.shadowfax.in/api/v1/order-serviceability/";
    s_con.ORDER_URL = "http://hobbit.demo.shadowfax.in/api/v2/orders/";
    s_con.HOST  = "http://hobbit.demo.shadowfax.in";
    s_con.TEST_VAL = true;
      
} else{
 
    s_con.TOKEN = "8d6e07a0860f2ccd4eexyxyx";
    s_con.CLIENT_CODE = "near001";
    s_con.STATUS_URL = "http://api.shadowfax.in/api/v2/orders/9220102/status/";
    s_con.SERVICE_URL = "http://api.shadowfax.in/api/v1/order-serviceability/";
    s_con.ORDER_URL = "http://api.shadowfax.in/api/v2/orders/";
    s_con.HOST  = "http://api.shadowfax.in";
    s_con.TEST_VAL = false;
}


  
  
  module.exports = {
's_con':s_con
};