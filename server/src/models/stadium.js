var mongoose = require('mongoose');

var stadiumSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    city: String,
    address: String,
    gName: String,
    location:{
        lat: Number,
        lng: Number
    }
});

var Stadium = mongoose.model('stadium',stadiumSchema,'stadiums');

module.exports = Stadium;