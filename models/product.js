const mongoose = require('mongoose');

productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    categories:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','vegie']
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;

