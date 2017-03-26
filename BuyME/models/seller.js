var mongoose = require('mongoose');

//seller schema
var SellerSchema = mongoose.Schema({
    
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
    garden_name:{
        type: String,
        required: true
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
    products:[],//should add json object{object_id,object_name, quantity}
    notification:[],
    transport_orders:[],
    ratings:[],
    profile_pic:{
        type:String
    }
    
});

var Seller = module.exports = mongoose.model('Seller',SellerSchema);