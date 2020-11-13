var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
require("dotenv").config();
const passport = require("passport");
require("./helpers/passport");


var indexRouter = require('./routes/index');
const mongoose = require("mongoose");

var app = express();
// mongoose.connect("mongodb://localhost/finalproject", { useNewUrlParser: true, useUnifiedTopology: true },)
mongoose.connect("mongodb+srv://Minhlong123:Minhlong123@cluster0.l6kvb.mongodb.net/finalproject?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },)
const db = mongoose.connection
db.once("open", function () {
    console.log("MongoDB database connection established successfully!");
    // require("./test/testSchema") // tao Fake DATA cho project
});
app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
