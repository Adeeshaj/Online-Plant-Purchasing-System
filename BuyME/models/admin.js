var mongoose = require('mongoose');

//admin schema
var AdminSchema = mongoose.Schema({
    
    user_id: {
        type: Schema.Types.ObjectId,
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
    notification:[]
    
});

var Admin = module.exports = mongoose.model('Admin',AdminSchema);