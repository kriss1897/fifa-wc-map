var express = require('express');
var router = express.Router();
var Competition = require('../models/competition');

/**
 * @method get
 * @description List all the competitions
 */
router.get('/',function(req,res,next){
    // Competition.find(function(error,competition){
    //     req.competitions = competition;
    //     next();
    // });
    Competition.aggregate([
        { $group: {  _id: {country:"$host",location:"$location",code: "$country.code"},  iterations: {    $addToSet: {      year: "$year",      matches: "$matches",      teams: "$teams",      winner: "$winner",      runnersUp: "$runnersUp",      third: "$third",      fourth: "$fourth",      attendance: "$attendance", host: "$host"}  },} },
        { $addFields: {  location: "$_id.location",  code: "$_id.code", host: "$_id.country"} }
    ]).then(function(competitions){
        req.competitions = competitions;
        next();
    })
},function(req,res){
    res.json(req.competitions);
});

/**
 * @method get
 * @param country 
 * @description List all the competitions hosted by a given country
 */
router.get('/country/:country',function(req,res,next){
    var country = req.params.country;
    Competition.find({"country.code":country},function(error,countries){
        if(error) console.log(error);
        req.countries = countries;
        next();
    })
},function(req,res){
    res.json(req.countries);
});

router.get('/stats',function(req,res,next){
    Competition.aggregate([
        { $group: {  _id: "$winner",  years: {    $addToSet: "$year"  },} },
        { $addFields: { wins: {$size:"$years"}} },
        { $sort: {  wins: -1,} }
    ]).then(function(stats){
        req.stats = stats;
        next();
    })
},function(req,res){
    res.json(req.stats);
});

module.exports = router;