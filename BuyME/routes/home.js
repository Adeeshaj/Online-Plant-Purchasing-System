var express = require('express');
var router = express.Router();
var path = require('path');
var SellerProduct = require('../models/seller_product');

router.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname+'/../public/home_page/index.html'));
});

router.get('/getproducts',function(req,res,next){
    var type = req.query.type;
    SellerProduct.getProductsRandom(type, function (err, products) {
        
        if(err) {

            return res.json({success: true, data: err}); 
        }

        if(!products){
            return res.json({success: false, msg: "no products"})
        }
        else{
            
            return res.json({success: true, data: products}); 
        }
    });
});

router.get('/getSellerProducts',function(req,res,next){
    SellerProduct.getProducts(function(err,products){
        if(err){
            res.json({success: true, data: err}); 
        }
        if(!products){
            return res.json({success: false, msg: "no products"})
        }
        else{
            
            return res.json({success: true, data: products}); 
        }
    });
});

router.get('/getAllproducts',function(req,res,next){
    var type = req.query.type;
    SellerProduct.getProducts(type, function (err, products) {
        
        if(err) {

            return res.json({success: true, data: err}); 
        }

        if(!products){
            return res.json({success: false, msg: "no products"})
        }
        else{
            
            return res.json({success: true, data: products}); 
        }
    });
});

module.exports = router;