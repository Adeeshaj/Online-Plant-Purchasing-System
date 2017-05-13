var mongoose = require('mongoose');

//products schema
var SellerProductSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },       
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sellerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sellerName:{
        type: String,
        required: true
    }
    
});

var SellerProduct = module.exports = mongoose.model('SellerProduct',SellerProductSchema);

module.exports.addProduct = function (user,newProduct,callback) {

    let newSellerProduct = new SellerProduct({
        name: newProduct.name,
        type: newProduct.type,
        quantity: newProduct.quantity,
        price: newProduct.price,
        description: newProduct.description,
        sellerID: user.user_id,
        sellerName: user.name
    });

    newSellerProduct.save(callback);
   
}