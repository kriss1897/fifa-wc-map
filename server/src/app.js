var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var matchesRouter = require('./routes/matches');
var competitonsRouter = require('./routes/competitions')
var indexRouter = require('./routes/index');

var app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://kriss:secret1897@ds149732.mlab.com:49732/fifa-wc-map',{useNewUrlParser:true});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'./../public')))
app.use('/',indexRouter);
app.use('/matches', matchesRouter);
app.use('/competitions', competitonsRouter)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;
