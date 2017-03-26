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
    }
    
        
});

var TransprotOrder = module.exports = mongoose.model('TransportOrder',TranspordOrderSchema);