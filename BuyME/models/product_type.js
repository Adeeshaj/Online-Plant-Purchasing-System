var mongoose = require('mongoose');

//productType schema
var ProductTypeSchema = mongoose.Schema({
    
    type:{
        type: String,
        required: true
    }
});

var ProductType = module.exports = mongoose.model('ProductType',ProductTypeSchema);

module.exports.addProductType = function (newProductType,callback) {
    newProductType.save(callback);
}

module.exports.getProudctTypes = function (callback) {
    ProductType.find(callback)
}