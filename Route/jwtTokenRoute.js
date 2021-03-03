var tokenController = require('../Controller/tokenController');

module.exports = function (app) {
  

  app.get('/getapiTokenJWT', tokenController.getDunzoToken);

}
