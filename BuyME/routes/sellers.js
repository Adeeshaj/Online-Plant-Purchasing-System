var express = require('express');
var router = express.Router();
var path = require('path');
var Seller = require('../models/seller');
var Product = require('../models/product');


router.post('/requestProduct',function (req,res,next) {
    let newProduct = new Product({
        type: req.body.type,
        name: req.body.name
    });
    
    Product.addProudct(newProduct,function (err,product) {
        if(err){
            res.json({sucess: false, msg:'Failed to register product', error:err});
        }
        else{
            res.json({sucess: true, msg:'product registered'});
        }
    })
});

module.exports = router;
