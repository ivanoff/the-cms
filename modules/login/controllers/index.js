"use strict"

/**
 * Index controllers
 */

exports.getIndex = function (req, res) { 

  var swig = require('swig');
  res.send(swig.renderFile(__dirname + '/../views/index.html'));

};


