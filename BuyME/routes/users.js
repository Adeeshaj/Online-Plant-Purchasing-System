var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Buyer = require('../models/buyer');
var Seller = require('../models/seller');
var TransportProvider = require('../models/transport_provider');
var Admin = require('../models/admin');
var config = require('../config/database');
var path = require('path');

router.post('/register',function (req,res,next) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        user_role: req.body.user_role
    });
    
    User.addUser(newUser, function (err, user) {
        if(err){
            res.json({sucess: false, msg:'Failed to register user', error:err});
        }else{
            res.json({sucess: true, msg:'user registered', res: user});
            if(newUser.user_role == 'seller'){
                let newSeller = new Seller({
                    user_id: newUser._id,
                    name: req.body.name,
                    district: req.body.district,
                //  location: req.body.location,
                    garden_name: req.body.garden_name,
                    address: req.body.address,
                    mobile_num: req.body.mobileNumber,
                    nic: req.body.nic,
                    verified: false
                }); 
                User.getUserById(newUser._id,function(err,user){
                    if(err) throw err;
                    if(!user){
                        
                    }
                    else{
                        Seller.addSeller(newSeller);
                    }
                })
                
             }
             if(newUser.user_role == 'buyer'){
                let newBuyer = new Buyer({
                    user_id: newUser._id,
                    name: req.body.name,
                    district: req.body.district,
                //  location: req.body.location,
                    address: req.body.address,
                    mobile_num: req.body.mobileNumber,
                    nic: req.body.nic,
                    verified: false
                }); 
                
                User.getUserById(newUser._id,function(err,user){
                        if(err) throw err;
                        if(!user){
                            
                        }
                        else{
                            Buyer.addBuyer(newBuyer);
                        }
                    })
                }
            
        
            
            if(newUser.user_role == 'transport_provider'){
                let newTransPortProvider = new TransportProvider({
                    user_id: newUser._id,
                    name: req.body.name,
                    district: req.body.district,
                //  location: req.body.location,
                    address: req.body.address,
                    mobile_num: req.body.mobileNumber,
                    nic: req.body.nic,
                    verified: false
                }); 
                
                    User.getUserById(newUser._id,function(err,user){
                        if(err) throw err;
                        if(!user){
                            
                        }
                        else{
                            TransportProvider.addTransportProvider(newTransPortProvider);
                          
                        }
                    });
                }
            
            if(newUser.user_role == 'admin'){
                let newAdmin = new Admin({
                    user_id: newUser._id,
                    name: req.body.name,
                    email: req.body.email,
                    mobile_num: req.body.mobileNumber,
                    nic: req.body.nic,
                    verified: false
                }); 
                
                User.getUserById(newUser._id,function(err,user){
                    if(err) throw err;
                    if(!user){
                        
                    }
                    else{
                        Admin.addAdmin(newAdmin)
                    }
                });
            }
        }
    });
    
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
                var token = jwt.sign(user,config.secret,{
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    sucess: true,
                    token: 'JWT '+token,
                    user:{
                        id: user._id,
                        username: user.username,
                        user_role: user.user_role   
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

router.get('/getUser',function(req,res,next){
    var user_id = req.query.user; 
    var user_role = req.query.user_role;
    if(user_role == 'buyer'){
        Buyer.getBuyerByUserId(user_id,function(err,buyer){
        if(err) throw err;
        if(!buyer){
            res.json({success: false, msg: "no buyer"})
        }
        else{
            res.json(buyer);
        }
    })
    }
    if(user_role == 'seller'){
        Seller.getSellerByUserId(user_id,function(err,seller){
        if(err) throw err;
        if(!seller){
            res.json({success: false, msg: "no seller"})
        }
        else{
            res.json(seller);
        }
    })
    }
    if(user_role == 'transport_provider'){
        TransportProvider.getTransportProviderByUserId(user_id,function(err,transport_provider){
        if(err) throw err;
        if(!transport_provider){
            res.json({success: false, msg: "no transport_provider"})
        }
        else{
            res.json(transport_provider);
        }
    })
    }
    if(user_role == 'admin'){
        Admin.getAdminByUserId(user_id,function(err,admin){
        if(err) throw err;
        if(!admin){
            res.json({success: false, msg: "no admin"})
        }
        else{
            res.json(admin);
        }
    })
    }
    
});