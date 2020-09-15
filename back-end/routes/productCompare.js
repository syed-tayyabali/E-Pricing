const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { productsModel, query } = require('../models/ProductsModel');

router.get('/:typeId/:seller_keyID', async (req, res) => {
    let heading = req.query.heading;
    let sellerId = req.params.seller_keyID;
    let type = req.params.typeId;
    var _id = new mongoose.Types.ObjectId(req.params.id);
    // productsModel.createIndexes({ heading: 'text' });

    const productCompare = await productsModel
        .find({
            $text: { $search: heading },
            seller_keyID: { $ne: sellerId },
            type: type,
            id: { $ne: _id }
        },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(10);

    const data = {};
    let result = [];
    //yahn sub sara data ek data k object k ander daal diya
    productCompare.map(product => {
        if (!data[product.seller_keyID]) {
            data[product.seller_keyID] = [];
        }
        data[product.seller_keyID].push(product);
    });

    //yahn prev data ko score ki ranking k hisab se set kr diya
    Object.keys(data).map(key => {
        data[key].sort((a, b) => a.score - b.score);
    });

    // yahn jo data score ki ranking ki hisab se set kiya tha osko result k array may dal diya.
    // or [0] index rakha is say jis ki higher value hogi sirf ho wala result may save hoga.
    Object.keys(data).map(key => {
        result.push(data[key][0]);
    });

    if (!productCompare)
        return res.status(404).send('the product with the given id is not found');

    if (!result[1]) {
        result = [result[0]];
    }
    else {
        result = [result[0], result[1]];
    }
    console.log(result[1])
    res.send(result);
});

module.exports = router;