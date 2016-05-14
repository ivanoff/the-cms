/****
 Index Routing
****/
"use strict"

var indexController = require('../controllers/index')

module.exports = function (app) {

  app.set('views', __dirname + '/../views');
  app.get( '/aa', indexController.getIndex );

}

