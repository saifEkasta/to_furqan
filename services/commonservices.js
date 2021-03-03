const request = require('request');
const fs = require('fs');
// const openGeocoder = require('node-open-geocoder');
const NodeGeocoder = require('node-geocoder');

const d_con = require('../config/dunzoconfig.js').d_con; 
const s_con = require('../config/shadowfaxconfig.js').s_con; 
// var Logger = require('../config/logger.js');
// var logger = Logger.logger;
const db = require("../Models");

const { get } = require('http');
const { con } = require('../config/dbconfig.js');

const Op = db.Sequelize.Op;
const Sequelize= db.Sequelize;
const sequelize= db.sequelize
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0r';
var getQuote = async function getQuote(headerData,reqData){
   
    var urlVal = d_con.QUOTE_URL+'?pickup_lat='+reqData.pickup_lat+'&pickup_lng='+reqData.pickup_lng+'&drop_lat='+reqData.drop_lat+'&drop_lng='+reqData.drop_lng+'&category_id=pickup_drop';
    var result = {status:0,data:'failed'};
        var options2 = { 
        url: urlVal,
        headers: headerData ,   
        method: 'GET'
        };
      var resuldata = new Promise((resolve, reject) => {

        request.get(options2, function(error, response, body) {
          if(!error){ 
          if(response.statusCode == 200 || response.statusCode == 201 ){
          result.data = JSON.parse(body);
          result.status = 1;
          resolve(result);
          }else{
          result.status = 0;
          result.data = JSON.parse(body);
          resolve(result);
          }
          }else{
            result.status = 0;  
            resolve(result);      
            }
          });

      })

      return resuldata;
        
}

var getService = async function getService(headerData,reqData){

  var result = {status:0,data:'failed'};
      var options2 = { 
      url: s_con.SERVICE_URL,
      headers: headerData,   
      body: JSON.stringify(reqData),
      method: 'PUT'
      };
    var resuldata = new Promise((resolve, reject) => {

      request.put(options2, function(error, response, body) {
        if(!error){ 
        if(response.statusCode == 200 || response.statusCode == 201 ){
        result.data = JSON.parse(body);
        console.log(body);
        result.status = 1;
        resolve(result);
        }else{
        result.status = 0;
        result.data = body;;
        resolve(result);
        }
        }else{
          console.log(error);
          result.status = 0;  
          resolve(result);      
          }
        });

    })

    return resuldata;
      
}

var editOrder = async function(headerData){
    var result = {status:0,data:'failed'};
    var curr = 'NS'+Math.floor(Math.random()*(999-100+1)+100);
    var order_id = curr+'-'+Date.now();
        var options2 = { 
        url: s_con.SERVICE_URL,
        headers: headerData,   
        body:JSON.stringify({
          "order_details":{
          "order_value":248,
          "paid":"false",
          // "client_order_id":"NS943-1602749219365"
          "clien_order_id": order_id
          },
          "client_code":s_con.CLIENT_CODE,
          "pickup_details":{
          "city":"Delhi",
          "contact_number":"8588025792",
          "name":"Store name",
          "longitude":77.2563207,
          "address":"Store address in plain text",
          "latitude":28.4833332
          },
          "order_items":[
          {
          "name":"Item name",
          "price":259,
          "quantity":3,
          "id":"29656019"
          }
          ],
          "drop_details":{
          "name":"Customer name",
          "longitude":77.337531,
          "address":"Customer address in plain text",
          "latitude":28.288891,
          "contact_number":"8588025792",
          "city":"Delhi"
          }
          }),
        method: 'PUT'
        };
      var resuldata = new Promise((resolve, reject) => {
  
        request.put(options2, function(error, response, body) {
          if(!error){ 

          if(response.statusCode == 200 || response.statusCode == 201 ){
          result.data = JSON.parse(body);
          result.status = 1;
          resolve(result);
          }else{
          result.status = 0;
          result.data = JSON.parse(body);
          resolve(result);
          }
          }else{
            console.log(error);
            result.status = 0;  
            resolve(result);      
            }
          });
  
      })
  
      return resuldata;
        
  }
  var cancelOrder =  async function cancelOrder(body_data,task_id,headerData){
    // var order_id = '9239612';
var result = {status:0,data:'failed'};
  var urlVal = s_con.HOST+'/api/v2/orders/'+task_id+'/cancel/';
  var options2 = { 
  url: urlVal,
  headers: headerData ,   
  body: JSON.stringify(body_data),
  method: 'PUT'
  };

  try{
    var resuldata = new Promise((resolve, reject) => {
      request.put(options2, function(error, response, body) {
        if(!error){ 
      
        if(response.statusCode == 200 || response.statusCode == 201 ){
        result.data = JSON.parse(body);
        result.status = 1;
        resolve(result);
        }else{
        result.status = 0;
        result.data = body;
        resolve(result);
        }
        }else{
          console.log(error);
          result.status = 0;  
          resolve(result);      
          }
        }); 
    })
    return resuldata;
    
  }catch(e){
    return e;
  } 

  }

  var cancelTask =  async function cancelTask(body_data,task_id,headerData){
  var result = {status:0,data:'failed'};
  var urlVal = d_con.DUNZO_HOST+'/api/v1/tasks/'+task_id+'/_cancel';

  var options2 = {
  url: urlVal,
  headers: headerData ,  
  body: JSON.stringify(body_data),
  method: 'POST'
  };

  try{
    var resuldata = new Promise((resolve, reject) => {
      request.post(options2, function(error, response, body) {
        if(!error){ 

        console.log(response.statusCode);
        if(response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204 ){
        result.data = body;
        console.log('isme if me')
        result.status = 1;
        resolve(result);
        }else{
          console.log('isme else me')
        result.status = 0;
        result.data = JSON.parse(body);
        resolve(result);
        }
        }else{
          console.log(error);
          result.status = 0;  
          resolve(result);      
          }
        }); 
    })
    return resuldata;  
  }catch(e){
    return e;
  } 

  }
var getStatus =  async function getStatus(task_id,headerData){
var result = {status:0,data:'failed'};
  var urlVal = s_con.HOST+'/api/v2/orders/'+task_id+'/status/';
  
  var options2 = { 
  url: urlVal,
  headers: headerData ,   
  method: 'GET'
  };

  try{
    var resuldata = new Promise((resolve, reject) => {
      request.get(options2, function(error, response, body) {
        if(!error){ 
       
        if(response.statusCode == 200 || response.statusCode == 201 ){
        result.data = JSON.parse(body);
        result.status = 1;
        resolve(result);
        }else{
        result.status = 0;
        result.data = body;
        resolve(result);
        }
        }else{
          console.log(error);
          result.status = 0;  
          resolve(result);      
          }
        });
  
    })
  
    return resuldata;
    
  }catch(e){
    return e;
  } 
}

var trackTask =  async function trackTask(task_id,headerData){
  var result = {status:0,data:'failed'};
  var urlVal = d_con.DUNZO_HOST+'/api/v1/tasks/'+task_id+'/status';
   
    var options2 = { 
    url: urlVal,
    headers: headerData ,   
    method: 'GET'
    };
    try{
      var resuldata = new Promise((resolve, reject) => {
        request.get(options2, function(error, response, body) {
          if(!error){ 
          if(response.statusCode == 200 || response.statusCode == 201 ){
          result.data = JSON.parse(body);
          result.status = 1;
          resolve(result);
          }else{
          result.status = 0;
          result.data = body;
          resolve(result);
          }
          }else{
            console.log(error);
            result.status = 0;  
            resolve(result);      
            }
          });
    
      })
    
      return resuldata;
      
    }catch(e){
      console.log('err')
      return e;
    } 
  }
var getGeoCoding =  async function getGeoCoding(address){

            var result = {status:0,data:'failed'};
                const options = {
                    provider: 'google',
                  apiKey:'AIzaSyDzguEWEhmgChzOdIyPClhxyxyxy',
                    formatter: null
                };
                const geocoder = NodeGeocoder(options);   
                var geoCodeOptions  = { 
                address: address,
                country: 'india'
                };          
  var  zipCodeVal = address.match(/(^|[^\d])(\d{6})([^\d]|$)/);
    if (zipCodeVal !== null)
    geoCodeOptions.zipCode = zipCodeVal[2];

    const res2 = await geocoder.geocode(geoCodeOptions);
        result = { status:1, data:res2 };       
        return result;
        }

var createOrder = async function createOrder(headerData,body_data){
var result = {status:0,data:'failed'};
var options3 = { 
url: s_con.ORDER_URL,
headers: headerData,  
body :JSON.stringify(body_data) ,
method: 'POST'
};

try{
  var resuldata = new Promise((resolve, reject) => {

    request.post(options3, function(error, response, body) {
      if(!error){ 
      console.log(response.statusCode);
      if(response.statusCode == 200 || response.statusCode == 201 ){
      result.data = JSON.parse(body);
      result.status = 1;
      resolve(result);
      }else{
      result.status = 0;
      result.data = JSON.parse(body);
      resolve(result);
      }
      }else{
        console.log(error);
        result.status = 0;  
        resolve(result);      
        }
      });

  })

  return resuldata;
  
}catch(e){
  return e;
} 

}
var createTask = async function createTask(headerData,body){
  var result = {status:0,data:'failed'};
  var curr = 'NS'+Math.floor(Math.random()*(999-100+1)+100);
  var request_id = curr+'-'+Date.now();

var options3 = { 
  url: d_con.TASK_URL,
  headers: headerData,  
  body :JSON.stringify(body),
  method: 'POST'
};
try{
  var resuldata = new Promise((resolve, reject) => {
    request.post(options3, function(error, response, body) {
      if(!error){ 
     
      if(response.statusCode == 200 || response.statusCode == 201 ){
      result.data = JSON.parse(body);
      result.status = 1;
      resolve(result);
      }else{
      result.status = 0;
      result.data = JSON.parse(body);
      resolve(result);
      }
      }else{
        console.log(error);
        result.status = 0;  
        resolve(result);      
        }
      });

  })

  return resuldata;
  
}catch(e){
  return e;
} 

}


        module.exports = {
        'getGeoCoding' : getGeoCoding,
        'getQuote' : getQuote,
        'getService': getService,
        'createOrder': createOrder,
        'createTask' : createTask,
        'editOrder':editOrder,
        'getStatus': getStatus,
        'cancelOrder':cancelOrder,
        'cancelTask' : cancelTask,
        'trackTask': trackTask
        }