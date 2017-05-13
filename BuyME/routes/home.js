var express = require('express');
var router = express.Router();
var path = require('path');
var SellerProduct = require('../models/seller_product');

router.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname+'/../public/home_page/index.html'));
});

router.get('/getproducts',function(req,res,next){
    
});

module.exports = router;