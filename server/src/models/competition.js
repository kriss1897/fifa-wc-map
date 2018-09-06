var mongoose = require('mongoose');

var competitionSchema = new mongoose.Schema({
    year: Number,
    host: String,
    winner: String,
    runnersUp: String,
    third: String,
    fourth: String,
    goalsScored: Number,
    teams: Number,
    matches: Number,
    attendance: Number,
    location: {
        lat: Number,
        lng: Number
    },
    country: {
        name: String,
        flag: String,
        location: Array,
        code: String
    },
    alpha2Code: String
});

var Competition = mongoose.model('competition',competitionSchema);

module.exports = Competition;