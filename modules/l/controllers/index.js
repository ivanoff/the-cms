"use strict"

/**
 * Index controllers.
 */

exports.getIndex = function (req, res) { 

  var swig = require('swig');
  res.send(swig.renderFile(__dirname + '/../views/index.html', { name : 'modul', image : 'potato.jpg' }));

//  res.render( 'index', { name : 'modul', image : 'potato.jpg' } )

//  res.send( 'index' )

};


