var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    name: String,
    code: String,
    alpha2Code: String,
    flag: String,
    location: {
        lat: Number,
        lng: Number
    }
});

var Country = mongoose.model('country',countrySchema,'countries');

module.exports = Country;