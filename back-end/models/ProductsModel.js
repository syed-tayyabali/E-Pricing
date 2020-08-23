const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


const productsSchema = new mongoose.Schema({
    _id: { type: ObjectId },
    heading: { type: String },
    price: { type: Number },
    product_url: { type: String },
    productSmallImg: { type: String },
    productLargeImg: { type: String },
    description: { type: [String] },
    overview: { type: String },
    category: { type: String },
    seller_key: { type: String },
    seller_keyID: { type: Number },
    type: { type: Number }
});

const products = mongoose.model('products', productsSchema, 'Products_tb');

function query(req) {
    let brand = req.query.brand;
    let priceMax = req.query.priceMax;
    let priceMin = req.query.priceMin;
    let type = req.params.typeId;
    let sellerId = req.params.seller_keyID;
    let category = req.query.category;
    let query = {};

    if (priceMax && priceMin) {
        query.price = { $lte: priceMax, $gte: priceMin }
    } else if (priceMax) {
        query.price = { $lte: priceMax }
    } else if (priceMin) {
        query.price = { $gte: priceMin }
    }
    if (brand) {
        query.heading = new RegExp(".*" + brand + ".*", 'i');
    }
    if (type) {
        query.type = type;
    }
    if (sellerId) {
        query.seller_keyID = sellerId;
    }
    if(category){
        query.category = category
    }

    return query;
}

module.exports.query = query;
module.exports.productsModel = products;