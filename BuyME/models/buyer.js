var mongoose = require('mongoose');

//buyer schema
var BuyerSchema = mongoose.Schema({
    
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    distirct:{
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