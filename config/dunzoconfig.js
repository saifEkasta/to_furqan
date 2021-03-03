require('dotenv').config();
var dunzo_env = process.env.D_MODE;
var d_con ={};
if(dunzo_env == 'DEV'){
    d_con.SECRET = "d7f28263-80dc-484a-a52c-793c653xxx";
   d_con.CLIENT_ID = "cf3e0965-5b7a-4cea-8c50-8ab9acxyyx";
   d_con.TOKEN_URL = "https://apis-staging.dunzo.in/api/v1/token";
    d_con.QUOTE_URL = "https://apis-staging.dunzo.in/api/v1/quote";
    d_con.TASK_URL = "https://apis-staging.dunzo.in/api/v1/tasks?test=true";
    d_con.DUNZO_HOST  = "https://apis-staging.dunzo.in";
    d_con.TEST_VAL = true;
      
} else{

    d_con.SECRET = "0c4ae044-579a-4xyxy";
    d_con.CLIENT_ID = "2133c50b-cb6d-47ef-xyxyx";
    d_con.TOKEN_URL = "https://api.dunzo.in/api/v1/token";
     d_con.QUOTE_URL = "https://api.dunzo.in/api/v1/quote";
     d_con.TASK_URL = "https://api.dunzo.in/api/v1/tasks";
     d_con.DUNZO_HOST  = "https://api.dunzo.in";
     d_con.TEST_VAL = true;
     d_con.TEST_VAL1 = true;
}


  
  
  module.exports = {
'd_con':d_con
};