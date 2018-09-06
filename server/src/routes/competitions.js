var express = require('express');
var router = express.Router();
var Competition = require('../models/competition');

/**
 * @method get
 * @description List all the competitions
 */
router.get('/',function(req,res,next){
    Competition.find(function(error,competition){
        req.competitions = competition;
        next();
    });
},function(req,res){
    res.json(req.competitions);
});

/**
 * @method get
 * @param country 
 * @description List all the competitions hosted by a given country
 */
router.get('/:country',function(req,res,next){
    var country = req.params.country;
    Competition.find({"country.code":country},function(error,countries){
        if(error) console.log(error);
        req.countries = countries;
        next();
    })
},function(req,res){
    res.json(req.countries);
});

module.exports = router;