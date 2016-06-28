/****
 Index Routing
****/
"use strict"

var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index')

router.get( '/', indexController.getIndex );

router.get('/l', function(req, res, next) {
  res.send('lllll');
});

exports = module.exports = router;
