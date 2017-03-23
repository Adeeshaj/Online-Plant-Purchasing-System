var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/database');

router.post('/register',function (req,res,next) {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser, function (err, user) {
        if(err){
            res.json({sucess: false, msg:'Failed to register user'});
        }else{
            res.json({sucess: true, msg:'user registered'});
        }
    })
});

router.post('/auth',function (req,res,next) {
    var username = req.body.username;
    var password = req.body.password;
    
    User.getUserByUsername(username, function (err,user) {
        if(err) throw err;
        if(!user){
            return res.json({sucess: false, msg: 'User not found'})
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) throw err;
            if(isMatch){
                var token = jwt.sign(user, config.secret,{
                    expiresIn: 604800 // 1 week
                });
                
                res.json({
                    sucess: true,
                    token: 'JWT '+token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username
                    }
                });
            }else{
                return res.json({sucess: false, msg: 'Wrong Password'});
            }
        });
        
    });
});

router.get('/profile', passport.authenticate('jwt', {session:false}),function (req,res,next) {
    res.json({user: req.user});
});

module.exports = router;