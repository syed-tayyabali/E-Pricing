const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    products: [{
        productId: { type: String },
        quantity: { type: Number }
    }]
});

const wishList = mongoose.model('wishList', wishListSchema, 'wishList_tb');

module.exports.wishList = wishList;