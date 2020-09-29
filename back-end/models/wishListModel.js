const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    products: [{
        productId: { type: Number },
        quantity: { type: Number }
    }]
});

const wishList = mongoose.model('wishList', wishListSchema, 'wishList_tb');

module.exports.wishList = wishList;