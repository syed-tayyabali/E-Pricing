const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String }
});

const productType = mongoose.model('productType', productTypeSchema, 'ProductType');

module.exports.productTypes = productType;