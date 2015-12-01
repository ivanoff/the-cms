"use strict"

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');

var db  = require('./lib/db');

var app = new express();

var DB_URL   = config.get( 'DB_URL' ) || process.env.DB_URL;
if( process.env.DB_AUTH ) DB_URL = 'mongodb://'+process.env.DB_AUTH+'@'+DB_URL;

// config part
var PORT     = process.env.SERVER_PORT || config.get( 'SERVER_PORT' ) || 3000,
    LOG_PATH = process.env.LOG_PATH    || config.get( 'LOG_PATH' )    || './log',
    ERROR    = config.get( 'ERRORS' );

// loging part
var log = bunyan.createLogger( { 
  name: "server",
  port: PORT,
  streams: [
      { level: 'debug', stream: process.stdout },
      { level: 'error', path: LOG_PATH+'/error.log' }
  ]
});

// error and nice loging function
var error_and_log = function ( error, res ){
    var e = error || ERROR.UNKNOWN_ERROR;
    // global error goes to developerMessage
    if( error.errmsg ) {
        e = ERROR.SERVER_ERROR;
        e.developerMessage = error;
    }
    res.status( e.status || 400 );
    log.error( e );
    res.json( e );
    return e;
}

app.use( function( req, res, next ){ 
    req.db    = db.get(); 
    req.error = function( error ) { error_and_log ( error, res ) };
    next();
});

app.use( bodyParser.urlencoded({ extended: true }) );

require("./routes/index")(app);

// Get the rest routes
var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

exports.start = function( done ) {
    aws.connect( AWS, function( err, next ){  });
    db.connect( DB_URL, function( err, next ) {
        if ( err ) { return next( err ) }
        this.server = app.listen( PORT, function() {
            log.info({pid:1},'['+PORT+'] server started');
            console.log( 'Listening on port ' + PORT + '...' );
            done();
        });
    }.bind(this))
}

exports.stop = function( ) {
    this.server.close();
    console.log( 'Server stopped' );
};
