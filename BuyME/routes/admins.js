var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models/admin');
var ProductType = require('../models/product_type');

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
module.exports = router;