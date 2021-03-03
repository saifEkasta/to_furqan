  
var Route = require('express').Router();

var home = require('./home.route');  
// Route.use('/dunzoAPI',dunzoRoute);
// Route.use('/shadowfaxAPI',shadowfaxRoute);
Route.use('/',home);
module.exports = Route;
  

