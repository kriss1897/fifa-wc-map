var express = require('express');
var router = express.Router();
var Match = require('../models/match');

/**
 * @method get
 * @description List all the mathes played
 */
router.get('/',function(req,res,next){
    res.render('index',{title:"Express"});
});

module.exports = router;