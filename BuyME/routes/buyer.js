var express = require('express');
var router = express.Router();
var path = require('path');
var ProductType = require('../models/product_type');
var Order = require('../models/order');
var SellerProduct = require('../models/seller_product');

// router.post('/buyProduct',function (req,res,next) {
//     let newProductType = new ProductType({
//         type: req.body.name
//     });
    
//     ProductType.addProductType(newProductType,function (err,type) {
//         if(err){
//             res.json({sucess: false, msg:'Failed to register product type', error:err});
//         }
//         else{
//             res.json({sucess: true, msg:'product type registered'});
//         }
//     })
// });

router.post('/addOrder', function(req,res,next) {
    req.body.order.product.quantity = parseInt(req.body.order.product.quantity);
    let newOrder = new Order({
        productId: req.body.order.product.productId,
        name: req.body.order.product.name,
        type: req.body.order.product.type,
        quantity: req.body.order.product.quantity,
        price: req.body.order.product.price,
        buyer: req.body.order.buyer,
        seller: req.body.order.seller,
        buyerConform : false
    });
//productId is seller_product_id
   
    
    
    console.log(req.body.order.product);
    console.log(newOrder);
    SellerProduct.editProductQuantity(req.body.order.product.productId,req.body.order.product.quantity,function (err,seller_product) {
        if(err){
             res.json({sucess: false,msg:'Failed to register order', error:err});
        }   
        else{
            
            Order.addOrder(newOrder);
            res.json({sucess: true, msg:'order registered'});
        }       
    })
    
});

module.exports = router;    