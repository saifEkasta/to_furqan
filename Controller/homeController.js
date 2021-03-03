
var tokenSecret = require('../config/tokenSecret');
var request = require("request");
const http= require('http');
var jwt = require('jsonwebtoken');
const Commonservices =  require('../services/commonservices');
const db = require('../Database');
const dunzoData = db.dunzoData;
const dunzoLogs = db.dunzoLogs;
const { con } = require('../config/dbconfig');



function getStoresData(){
          
    var result = {status:0,data:'failed'};
    var urlVal = "https://near.store/store/allstores";
     
      var options2 = { 
      url: urlVal, 
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


var home = async function(req, res){

    var allStores = await getStoresData();

 
  var datata = {};
 
    res.render('home.ejs',{'allStores': allStores,'datata':datata});
}

async function getGeoCoding(pickAdd, dropAdd){

  var result = {status:0, data:'unable to get geographical location'}
  // var pickAdd = " 2601 C wing, Runwal Elegante, P Tandon Marg, Lokhandwala, Andheri west - 400047";
  // // var address1 = "flora hotel,Bypass,Bhiwandi - 421302";
  // var dropAdd = "flora hotel,Bypass,Bhiwandi - 421302";
var geoCodeDataPick = await Commonservices.getGeoCoding(pickAdd);
var geoCodeDataDrop = await Commonservices.getGeoCoding(dropAdd);
if(geoCodeDataPick.data.length > 0 && geoCodeDataDrop.data.length > 0){ 
  result.status = 1;
var geoCords = {
  
  pickup_add:geoCodeDataPick.data[0].formattedAddress,
  pickup_lat:geoCodeDataPick.data[0].latitude,
  pickup_lng:geoCodeDataPick.data[0].longitude,

  drop_add:geoCodeDataDrop.data[0].formattedAddress,
  drop_lat:geoCodeDataDrop.data[0].latitude,
  drop_lng:geoCodeDataDrop.data[0].longitude,

}
result.data = geoCords;
}
return result;
// res.send(result);
}


var getOrderData = async function(req, res){

//var order_id ='ek-9491-938130-3073';  //ek-9491-975180-6881
var order_id = req.query.order_id;
var store_id = req.query.store_id;
// var pickAdd = "C15 Lake Primerose ABC CHS. Ltd. Lake Homes Complex, Adi Shankaracharya Marg, Chandivali, Powai, Mumbai, 400076";
var pickAdd = req.query.storeadd;
var storemobile = req.query.storemobile;
var storename = req.query.storename;
  var getData =  await dunzoData.getOrderData(order_id.trim());
  console.log(getData);
  console.log('order_id',order_id);
  var result = {status:0, data:'unable to get data'};
  if(getData.length > 0){
    result.status=1;
  
  //  var pickAdd = " 2601 C wing, Runwal Elegante, P Tandon Marg, Lokhandwala, Andheri west - 400047";
    var dropAdd  = getData[0].address;
  var geoCodeDataPick = await Commonservices.getGeoCoding(pickAdd);
  var geoCodeDataDrop = await Commonservices.getGeoCoding(dropAdd);
  if(geoCodeDataPick.data.length > 0 && geoCodeDataDrop.data.length > 0){ 
    result.status = 1;
    // console.log(geoCodeDataPick);
  var geoCords = {
    
    pickup_add:geoCodeDataPick.data[0].formattedAddress,
    pickup_add_act:pickAdd,
    pickup_lat:geoCodeDataPick.data[0].latitude,
    pickup_lng:geoCodeDataPick.data[0].longitude,
    pickup_city: geoCodeDataPick.data[0].city,
    pickup_pincode: geoCodeDataPick.data[0].zipcode,
  
  
    drop_add:geoCodeDataDrop.data[0].formattedAddress,
    drop_add_act:dropAdd,
    drop_lat:geoCodeDataDrop.data[0].latitude,
    drop_lng:geoCodeDataDrop.data[0].longitude,
    drop_city: geoCodeDataDrop.data[0].city,
    drop_pincode: geoCodeDataDrop.data[0].zipcode,
   

    name: getData[0].name,
    mobile: getData[0].phone,
    amount: getData[0].bill_amount,  
    user_id: getData[0].userprofileId, 
    order_id: getData[0].order_id,  
    store_id:store_id,
    storemobile:storemobile,
    storename:storename,
  }
  result.data = geoCords;
  }else{
    var result = {status:0, data:'unable to get geo cords'};
  }
  }
 
res.send(result);
}


var getOrderDataAdhoc = async function(req, res){

  var order_id = req.query.order_id;
  var store_id = req.query.store_id;
  var pickAdd = req.query.storeadd;
  var ad_mobile = req.query.ad_mobile;
  var ad_name = req.query.ad_name;
  var dropAdd = req.query.ad_address;
  var storemobile = req.query.storemobile;
  var storename = req.query.storename;
  console.log(req.query);
    
    var result = {status:0, data:'unable to get data'};
      result.status=1;
    var geoCodeDataPick = await Commonservices.getGeoCoding(pickAdd);
    var geoCodeDataDrop = await Commonservices.getGeoCoding(dropAdd);
    if(geoCodeDataPick.data.length > 0 && geoCodeDataDrop.data.length > 0){ 
      result.status = 1;
      // console.log(geoCodeDataPick);
    var geoCords = {
      
      pickup_add:geoCodeDataPick.data[0].formattedAddress,
      pickup_add_act:pickAdd,
      pickup_lat:geoCodeDataPick.data[0].latitude,
      pickup_lng:geoCodeDataPick.data[0].longitude,
      pickup_city: geoCodeDataPick.data[0].city,
      pickup_pincode: geoCodeDataPick.data[0].zipcode,
    
    
      drop_add:geoCodeDataDrop.data[0].formattedAddress,
      drop_add_act:dropAdd,
      drop_lat:geoCodeDataDrop.data[0].latitude,
      drop_lng:geoCodeDataDrop.data[0].longitude,
      drop_city: geoCodeDataDrop.data[0].city,
      drop_pincode: geoCodeDataDrop.data[0].zipcode,
     
  
      name: ad_name,
      mobile: ad_mobile,
      amount: 777,  
      user_id: 777, 
      order_id: order_id,  
      store_id:store_id,
      storemobile:storemobile,
      storename:storename,
    }
    result.data = geoCords;
    }else{
      var result = {status:0, data:'unable to get geo cords'};
    }
 
   
  res.send(result);
  }

module.exports = {
	
  'home': home,
  'getGeoCoding':getGeoCoding,
  'getOrderData':getOrderData,
  'getOrderDataAdhoc':getOrderDataAdhoc


	

};