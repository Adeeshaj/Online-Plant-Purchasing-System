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
