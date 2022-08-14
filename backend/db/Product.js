const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});

module.exports = mongoose.model('products', productShema);