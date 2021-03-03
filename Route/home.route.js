 
  
var controller = require('../Controller');    
var Route = require('express').Router();   

	Route.get('/', controller.home.home); 
	Route.get('/home',controller.home.home);

	module.exports = Route;

