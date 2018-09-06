var express = require('express');
var router = express.Router();
var Match = require('../models/match');

/**
 * @method get
 * @description List all the mathes played
 */
router.get('/',function(req,res,next){
    Match.find()
        .populate('stadium')
        .exec(function(error,matches){
            if(error) throw error;
            req.matches = matches;
            next();
        });    
},function(req,res){
    res.json(req.matches);
})

/**
 * @method get
 * @param team
 * @description List of all the matches played in a
 */
router.get('/year/:year',function(req,res,next){
    Match.find({"year":req.params.year})
            .populate('stadium')
            .exec(function(error,matches){
                if(error) throw error;
                req.matches = matches;
                next();
            });
},function(req,res){
    res.json(req.matches);
});


/**
 * @method get
 * @param team
 * @description List of all the matches played by a team
 */
router.get('/team/:team',function(req,res,next){
    Match.find({"year":req.params.year},function(error,matches){
        if(error) throw error;
        req.matches = matches;
        next();
    });
});

module.exports = router;