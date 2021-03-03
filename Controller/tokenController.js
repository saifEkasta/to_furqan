
var tokenSecret = require('../config/tokenSecret');
var request = require("request");
const http= require('http');
var jwt = require('jsonwebtoken');



var getDunzoToken = async function(req, res, next){
  var options1 = {
		url: 'https://api.dunzo.in/api/v1/token',
		headers: {
			'client-id':'2133c50b-cb6d-47ef-a9bc-769ee48814ed',
			'client-secret' :'0c4ae044-579a-4cce-aad9-6db17e203c1e',
			'Accept-Language' : 'en_US',
			"content-type" : "application/json", 
		},
		method: 'GET'
	   };

	   if(req.timeout){

		var result = {status:0,data:'Request timeout'};  
		res.send(JSON.stringify(result));
	    }
	  
	var resD = '';
	 request.get(options1, function(error, response, body) { 
		if(!error && response.statusCode == 200 || response.statusCode == 201){

			resD = JSON.parse(body);
		
		  	res.cookie('dunzoToken', resD.token);
			req.dunzoToken =resD.token;
			
		
			next();
	
		}else{
		console.log(body);	
		var result = {status:0,data:'Failed to get token'};  
		res.send(JSON.stringify(result));
			
		}
	});
}



module.exports = {
	
	'getDunzoToken': getDunzoToken

	

};