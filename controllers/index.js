"use strict"

/**
 * Index controllers.
 */
exports.getIndex = function (req, res) { 
  res.render( 'index', { name : 'ABC' } )
//  res.send('Aloha!') 
};


