var mongoose = require('mongoose');

//products schema
var ProductSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },       
    verified:{
        type: Boolean,
        required: true
    }
});

var Product = module.exports = mongoose.model('Product',ProductSchema);

module.exports.addProduct = function (newProduct,callback) {
    newProduct.save(callback);
}

module.exports.getProductByType = function (type,callback) {
    var query = {type: type}
    Product.find(query, callback);
}
