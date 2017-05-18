var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models/admin');
var ProductType = require('../models/product_type');
var Product = require('../models/product');

router.post('/addProductType',function (req,res,next) {
    let newProductType = new ProductType({
        type: req.body.name
    });
    
    ProductType.addProductType(newProductType,function (err,type) {
        if(err){
            res.json({sucess: false, msg:'Failed to register product type', error:err});
        }
        else{
            res.json({sucess: true, msg:'product type registered'});
        }
    })
});

router.get('/getReqProducts',function (req,res,next) {
    Product.getNotVerifiedProducts(function (err,products) {
        if(err){
            res.json({sucess: false, msg: 'Fail',error:err});
        }
        else{
            res.json(products);
        }
    });
});

router.post('/verifyProduct',function (req,res,next) {

    Product.verifyProduct(req.body,function (err,msg) {
        if(err){
            res.json({sucess: false, msg: 'Fail',error:err});
        }
        else{
            res.json(msg);
        }
    });
});

router.post('/rejectProduct',function (req,res,next) {
  
    Product.rejectProduct(req.body,function (err,msg) {
        if(err){
            res.json({sucess: false, msg: 'Fail',error:err});
        }
        else{
            res.json(msg);
        }
    });
});
module.exports = router;