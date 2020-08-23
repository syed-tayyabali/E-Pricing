const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { productsModel, query } = require('../models/ProductsModel');

//ALL PRODUCT LISTENIG
router.get('/', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    const productList = await productsModel.find(query(req)).skip(size * (pageNo - 1)).limit(size);
    res.send(productList);
});

//ALL PRODUCT LISTENIG
// rou


//SPECIFIC PRODUCT DESCRIPTION
router.get('/:id', async (req, res) => {
    var _id = new mongoose.Types.ObjectId(req.params.id);
    const product = await productsModel.findOne({ _id })
    if (!product)
        return res.status(404).send('the product with the given id is not found');

    res.send(product);
});

//PRODUCT TYPE FILTER
router.get('/type/:typeId', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    const products = await productsModel.find(query(req)).skip(size * (pageNo - 1)).limit(size);
    const categories = await productsModel.find(query(req)).distinct('category');
    res.send({ products, categories });
});

router.get('/webCollection/:seller_keyID', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response);
    }

    const products = await productsModel.find(query(req)).skip(size * (pageNo - 1)).limit(size);
    const categories = await productsModel.find(query(req)).distinct('category');
    res.send({ products, categories });
})



router.get('/type/:typeId/:seller_keyID', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response);
    }

    const products = await productsModel.find(query(req)).skip(size * (pageNo - 1)).limit(size);
    const categories = await productsModel.find(query(req)).distinct('category');
    res.send({ products, categories });
});


module.exports = router;