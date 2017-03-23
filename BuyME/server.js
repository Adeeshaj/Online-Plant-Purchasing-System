var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var users = require('./routes/users');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database')

var app = express();

//database connection
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
app.use(express.static(__dirname + "/public"));
//app.use(express.static(__dirname + "/public/userRegistation"));
app.use('/users',users);  

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.listen(3000);
console.log("Server running on port 3000");