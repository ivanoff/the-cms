"use strict"

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var swig = require('swig');
var logger = require('morgan');

var app = new express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.set('view cache', false);
swig.setDefaults({ cache: false });

var PORT     = process.env.SERVER_PORT || config.get( 'SERVER_PORT' ) || 3000,
    LOG_PATH = process.env.LOG_PATH    || config.get( 'LOG_PATH' )    || './log',
    ERROR    = config.get( 'ERRORS' );

var log = bunyan.createLogger( { 
  name: "server",
  port: PORT,
  streams: [
      { level: 'debug', stream: process.stdout },
      { level: 'error', path: LOG_PATH+'/error.log' }
  ]
});

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.urlencoded({ extended: true }) );

require("the-cms-l")(app);
//app.use( '/l', require("the-cms-l") );
//require("the-cms-l")

// good
//var r = 'l';
//app.use('/'+r, require('the-cms-'+r)());

require('the-cms-login')(app, '/login');

require("./routes/index")(app);

// Get the rest routes
var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

exports.start = function( done ) {
    this.server = app.listen( PORT, function() {
        log.info({pid:1},'['+PORT+'] server started');
        console.log( 'Listening on port ' + PORT + '...' );
        done();
    });
}

exports.stop = function( ) {
    this.server.close();
    console.log( 'Server stopped' );
};
