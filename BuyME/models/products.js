var mongoose = require('mongoose');

//products schema
var ProductsSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }       
});

var Products = module.exports = mongoose.model('Products',ProductsSchema);