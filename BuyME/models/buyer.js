var mongoose = require('mongoose');
var config = require('../config/database');

//buyer schema
var BuyerSchema = mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    location:{
        longitude:{
            type:String,
        },
        latitude:{
            type: String
        }
    },
    address:{
        type: String,
        required: true
    },
    mobile_num:{
        type: String,
        required: true
    },
    nic:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        required: true
    },
    notification:[],
    transport_orders:[],
    profile_pic:{
        type:String
    }
    
});

var Buyer = module.exports = mongoose.model('Buyer',BuyerSchema);

module.exports.addBuyer = function (newBuyer) {
    newBuyer.save();
}

module.exports.getBuyerByUserId = function (user_id,callback) {
    var query = {user_id: user_id}
    Buyer.findOne(query,callback);
}

