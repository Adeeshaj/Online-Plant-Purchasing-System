var mongoose = require('mongoose');

//products schema
var ProductsSchema = mongoose.Schema({
    
    buyer:{
        buyer_id: Schema.Types.ObjectId,
        buyer_name: String,   
    },
    user:{
        user_id: Schema.Types.ObjectId,
        user_name: String,
    },
    ratigs:{
        type: Number,
        required: true
        
    },
    comments:{
        type: String,
    }
            
});

var rating = module.exports = mongoose.model('Rating',ratingSchema);