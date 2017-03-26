var mongoose = require('mongoose');

//transprot_provider schema
var TransportProviderSchema = mongoose.Schema({
    
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
    ratings:[],
    profile_pic:{
        type:String
    }
    
});

var TransportProvider = module.exports = mongoose.model('TransportProvider',TransportProviderSchema);