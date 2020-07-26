const mongoose = require('mongoose');

const whatMobileSchema = new mongoose.Schema({
    _id: String,
    heading: String,
    price: Number,
    description: String,
    category: String
});

const whatmobile = mongoose.model('WhatMobile', whatMobileSchema, 'whatmobile_tb');

module.exports.whatmobile = whatmobile;