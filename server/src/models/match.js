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

var matchSchema = new mongoose.Schema({
  awayTeamInitials:String,
  matchID:Number,
  roundID:Number,
  htAwayScore:Number,
  htHomeScore:Number,
  finalAwayScore:Number,
  finalHomeScore:Number,
  datetime:String,
  refree:String,
  year:Number,
  attendance:Number,
  city:String,
  home:String,
  stage:String,
  team:String,
  asstRefOne:String,
  asstRefTwo:String,
  desc:String,
  homeTeamInitials:String,
  stadium: {type: mongoose.Schema.Types.ObjectId, ref: 'stadium'}
});

var Match = mongoose.model('match',matchSchema);

module.exports = Match;