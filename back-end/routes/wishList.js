const authMiddleWare = require('../middleWare/authMiddleWare');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { wishList } = require('../models/wishListModel');
const { userModel } = require('../models/UserModel');
const { productsModel } = require('../models/ProductsModel');

router.get('/user/:userId', authMiddleWare, async (req, res) => {
    try {
        const userWishlist = await wishList.findOne({ userId: req.params.userId });
        const productIds = userWishlist.products.map(product => {
            return product.productId;
        });

        const productList = await productsModel.find({ '_id': { $in: productIds } });

        const products = userWishlist.products.map(product => {
            let combineProduct = productList.find(productId => productId._id.toString() === product.productId);
            let newProduct = { ...combineProduct._doc, quantity: product.quantity };
            return newProduct;
        });
        userWishlist.products = products;
        res.send({ ...userWishlist._doc, products });
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.post('/:userId', authMiddleWare, async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userId });
        if (!user) return res.status(404).send('User Not Found!!');

        let wishlistItem = await wishList.findOne({ userId: req.params.userId });
        if (!wishlistItem) {
            const data = _.pick(req.body, ['userId', 'productId', 'quantity']);
            wishlistItem = new wishList({ userId: data.userId, products: [{ productId: data.productId, quantity: data.quantity }] });
            await wishlistItem.save();
        } else {
            const data = _.pick(req.body, ['productId', 'quantity']);
            wishlistItem.products.push({ productId: data.productId, quantity: data.quantity });
            await wishlistItem.save();
        }
        res.send(wishlistItem);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.put('/updateWishList/:updateId', authMiddleWare, async (req, res) => {
    try {
        let wishlistItem = await wishList.findOne({ userId: req.params.updateId });
        if (!wishlistItem) return res.status(404).send('User Not Found');

        wishlistItem.products.map(product => {
            if (product.productId === req.body.productId) {
                return product.quantity = req.body.quantity;
            }
        });
        await wishlistItem.save();
        res.send(wishlistItem)
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.delete('/deleteWishList/:deleteId', authMiddleWare, async (req, res) => {
    try {
        let wishlistItem = await wishList.findOne({ userId: req.params.deleteId });
        if (!wishlistItem) return res.status(404).send('User Not Found');

        // deleting from array
        const removedProducts = wishlistItem.products.filter(remove => remove.productId != req.body.productId);
        wishlistItem.products = removedProducts;

        // updated document
        const newDoc = await wishlistItem.save();
        const productIds = newDoc.products.map(product => {
            return product.productId;
        });
        const productList = await productsModel.find({ '_id': { $in: productIds } });
        const products = newDoc.products.map(product => {
            let combineProduct = productList.find(productId => productId._id.toString() === product.productId);
            let newProduct = { ...combineProduct._doc, quantity: product.quantity };
            return newProduct;
        });
        newDoc.products = products;


        res.send({ ...newDoc._doc, products })
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

module.exports = router;