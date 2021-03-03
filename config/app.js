   module.exports =  function () {

      var Route = require('../Route');
      
         const express = require('express');
      const app  =  express();
      const os = require('os');
     
        
      const bodyParser = require('body-parser');
     
      const session = require('express-session');
      app.use(session({
      secret: '343ji43j4n3jn4jk3n',
      resave: true,
      saveUninitialized: true
      }))
      var cookieParser = require('cookie-parser');
      app.use(cookieParser());
      
      app.use(express.json()); // for parsing application/json
      app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
      
     
      app.set('view engine','ejs');	 // app.set('view engine', 'ejs');	
      app.use('/assets',express.static('assets/')); 

      const timeout = require('connect-timeout'); 
      app.use(timeout('1s',{respond:false}))
      const haltOnTimedout = (req, res, next) => {
         var result = { status:0, data:' Request time out'};
         if (!req.timedout){
         next();
      }else{
         res.json({ user: 'time out!!' }); 
      }

      }
  
      app.use('/', Route);
      app.listen(8085, () => console.log('listening on 8085'));
      }
      