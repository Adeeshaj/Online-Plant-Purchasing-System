var mongoose = require('mongoose');

//products schema
var TransportOrderSchema = mongoose.Schema({
    
    seller:{
        seller_id: Schema.Types.ObjectId,
        seller_name: String,
        location: {
            longitude: String,
            lattitude: String
        }       
    },
    buyer:{
        buyer_id: Schema.Types.ObjectId,
        buyer_name: String,
        location: {
            longitude: String,
            lattitude: String
        }     
    },
    transprot_provider:{
        transport_provider_id: Schema.Types.ObjectId,
        transport_provider_name: String,
        location: {
            longitude: String,
            lattitude: String
        }     
    },
    product:{
        product_id: Schema.Types.ObjectId,
        product_name: String,
        product_quantity: String
    },
    ordered_date:{
        //order created
    },
    requested_date:{
        //request to date
    },
    recieved_date:{
        //recieved_date
    },
    buyer_conform_delivery:{
        type: Boolean,
        required: true
    },
    seller_conform_handover:{
        type: Boolean,
        required: true
    },
    transport_provider_conform_delivery:{
        type: Boolean,
        required: true
    },
    transport_provider_conform_handorver:{
        type: Boolean,
        required: true
    }
    
    
        
});

var TransprotOrder = module.exports = mongoose.model('TransportOrder',TranspordOrderSchema);