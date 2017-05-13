var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var passport = require('passport');

var users = require('./routes/users');
var home = require('./routes/home');
var register = require('./routes/register');
var sellers = require('./routes/sellers');
var admins = require('./routes/admins');


var mongoose = require('mongoose');
var config = require('./config/database');

var app = express();

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', function(){
    console.log("Connected to database " + config.database)
});
mongoose.connection.on('error',function(err){
   console.log("database error: "+ err) 
});

//Using Middlewares
app.use(cors());
app.use(bodyparser.json());

//route middlewares
app.use(express.static(__dirname + "/public"));
app.use('/users',users);  
app.use('/home',home);
app.use('/register',register);
app.use('/sellers',sellers);
app.use('/admins',admins);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//server run
app.listen(3000);
console.log("Server running on port 3000");

module.exports = app;