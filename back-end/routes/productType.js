const express = require('express');
const router = express.Router();

const { productTypes } = require('../models/productTypeModel');

router.get('/', async (req, res) => {
    const productType = await productTypes.find();
    res.send(productType);
});

module.exports = router;