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

module.exports.getNotVerifiedProducts = function (callback) {
    var query = {verified:false};
    Product.find(query, callback);
}

module.exports.productById = function (product,callback){

    Product.findById(product._id,callback)
}

module.exports.verifyProduct = function(product,callback){
    
    Product.productById(product,function(err,p){
        if(err) throw err;
        if(!p){
            callback("product not in the system");
        }
        else{   
           
            p.verified = true;
            p.save(callback)
        }
    });
    
    
}

module.exports.rejectProduct = function(product,callback){
    
    Product.productById(product,function(err,p){
        if(err) throw err;
        if(!p){
            callback("product not in the system");
        }
        else{   
           
           
            p.remove(callback);
        }
    });
    
    
}