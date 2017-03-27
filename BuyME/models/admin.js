var mongoose = require('mongoose');

//admin schema
var AdminSchema = mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    nic:{
        type: String,
        required: true
    },
    mobile_num:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        required: true
    },
    notification:[]
    
});

var Admin = module.exports = mongoose.model('Admin',AdminSchema);

module.exports.addAdmin = function (newAdmin) {
    newAdmin.save();
}