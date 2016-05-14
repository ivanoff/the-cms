/****
 Index Routing
****/
"use strict"

var indexController = require('../controllers/index')

module.exports = function (app) {

//  app.use(express.static(__dirname + '/public'));

  app.get( '/', indexController.getIndex );

  app.all('*', function (req, res) {
    res.status(404);
    res.send('ERROR 404')
//    res.render('errors/404'); 
  });

}

