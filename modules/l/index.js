/****
 Index Routing
****/

var express = require('express');
var router = express.Router();

/*
/////////////////
var app = new express();
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });
  app.set('views', __dirname + '/../views');
  app.get( '/aa', indexController.getIndex );

  var normalizedPath = require("path").join(__dirname, "routes");
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./routes/" + file)(app);
  });
  return(app);
/////////////////
*/

var indexController = require('./controllers/index')
router.get( '/aa', indexController.getIndex );

router.get('/', function(req, res, next) {
  res.send('lllll');
});

router.get('/user', function(req, res, next) {
  res.send('111');
});

module.exports = function(app){

//  var swig = require('swig');
//  app.engine('html', swig.renderFile);
//  app.set('view engine', 'html');
//  app.set('views', __dirname + '/views');
//  app.set('view cache', false);       // NOTE: You should always cache templates in a production environment.
//  swig.setDefaults({ cache: false }); // Don't leave both of these to `false` in production!

  app.use(express.static(__dirname + '/public'));
  app.use( '/l', router );

}

/*

var auth = function (req, res, next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		return res.sendStatus(401);
	};

	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		return unauthorized(res);
	};

	if (user.name === options.auth.username && user.pass === options.auth.password) {
		return next();
	} else {
		return unauthorized(res);
	};
};


/* GET admin page. */
//router.get('/admin', auth, function(req, res, next) {
//	res.redirect('/');
//});

/*
"use strict"
var express = require('express');

var app = new express();

var indexController = require('./controllers/index')

module.exports = function() {

var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.set('view cache', false);
swig.setDefaults({ cache: false });

//  app.use(express.static(__dirname + '/public'));

  // Get the rest routes
  var normalizedPath = require("path").join(__dirname, "routes");
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./routes/" + file)(app);
  });
  return(app);

}

//}

//}
*/