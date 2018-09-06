var express = require('express');
var router = express.Router();
var Competition = require('../models/competition');

/**
 * @method get
 * @description List all the competitions
 */
router.get('/',function(req,res,next){
    req.features = [];
    Competition.find(function(error,competition){
        if(error) throw error;
        competition.forEach(function(comp){
            req.features.push({
                type: "Feature",
                geometry: {
                    "type": "Point",
                    "coordinates": [comp.location.lng,comp.location.lat]
                },
                properties: {
                    'name': comp.host,
                    'flag': 'assets/flags/'+comp.alpha2Code.toLowerCase()+'.png',
                    'code': comp.country.code
                }
            });
        });
        next();
    });
},function(req,res){
    res.json({
        type:"FeatureCollection",
        features: req.features
    });
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