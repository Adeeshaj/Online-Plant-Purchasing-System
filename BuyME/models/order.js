var mongoose = require('mongoose');
var Seller = require('../models/seller');
var Buyer = require('../models/buyer');
var SellerProduct = require('../models/seller_product');
var TransportProvider = require('../models/transport_provider')

//products schema
var OrderSchema = mongoose.Schema({
    
     buyer: {
        buyerId: mongoose.Schema.Types.ObjectId,
        name: String,
        district: String,
        address: String,
        mobile_num: String
    },
    seller: {
        sellerId: mongoose.Schema.Types.ObjectId,
        name: String,
        district: String,
        address: String,
        mobile_num: String
    },
    
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    quantity: Number,
    price: Number,
    transportProvider:{
        required:false
    },
    transportProviders:[], // transport providers Id will save here.
    buyerConform:{
        type: Boolean,
        required: true
    }
    
});

var Order = module.exports = mongoose.model('Order',OrderSchema);

module.exports.addOrder = function (newOrder) {
    //console.log(newOrder);
    newOrder.save();    
}

module.exports.getOrdersByUserId = function (user_id,user_role,callback){
    if(user_role=='buyer'){
        var query = {'buyer.buyerId': user_id}
        Order.find(query, callback);
    }
    if(user_role=='seller'){
        var query = {'seller.sellerId': user_id}
        Order.find(query, callback);
        console.log("sds");
    }
    if(user_role=='transport_provider'){
        var query = {transportProviderId: user_id}
        Order.find(query, callback);
    }
    
}

// module.exports.getOrders = function (user_id,user_role,callback) {
    
//     Order.getOrdersByUserId(user_id,user_role,function (err, orders) {
//         if(err) throw err;
//         if(!orders){
//             callback("no orders");
//         }
//         callback(orders);
   
// }

    
    
