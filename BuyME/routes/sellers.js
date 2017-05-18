var express = require('express');
var router = express.Router();
var path = require('path');
var Seller = require('../models/seller');
var Product = require('../models/product');
var ProductType = require('../models/product_type');
var SellerProduct = require('../models/seller_product');

router.post('/requestProduct',function (req,res,next) {
    let newProduct = new Product({
        type: req.body.type,
        name: req.body.name,
        verified: false
    });
    
    Product.addProduct(newProduct,function (err,product) {
        if(err){
            res.json({sucess: false, msg:'Failed to register product', error:err});
        }
        else{
            res.json({sucess: true, msg:'product registered'});
        }
    });
});

router.get('/getproducttypes',function (req,res,next) {
    ProductType.getProudctTypes(function (err, types) {
        if(err) throw err;
        if(!types){
            res.json({success: false, msg: "no product types"})
        }
        else{
            res.json(types);
        }
    });
});

router.get('/getproductnames', function (req,res,next) {
    var type = req.query.type;
    Product.getProductByType(type,function (err, names) {
        if(err) throw err;
        if(!names){
            res.json({success: false, msg: "no product names"})
        }
        else{
            res.json(names);
        }
    });
});

router.post('/addProduct',function (req,res,next) {
    var user_id = req.body.seller; 
    var products = req.body.products;
    
    Seller.getSellerByUserId(user_id,function(err,seller){
        if(err) throw err;
        if(!seller){
            res.json({success: false, msg: "no seller"})
        }
        else{
            SellerProduct.addProduct(seller,products,function (err,product) {
                if(err){
                    res.json({sucess: false, msg:'Failed to register product', error:err});
                }
                else{
                    
                }
            });
        }   
    });    
    
   
});


module.exports = router;
