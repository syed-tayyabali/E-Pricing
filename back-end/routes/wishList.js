const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { wishList } = require('../models/wishListModel');
const { userModel } = require('../models/UserModel');
const { productsModel } = require('../models/ProductsModel');

router.get('/user/:userId', async (req, res) => {
    try {
        const userWishlist = await wishList.findOne({ userId: req.params.userId });
        const productIds = userWishlist.products.map(product => {
            return product.productId;
        });

        const productList = await productsModel.find({ '_id': { $in: productIds } });

        const products = userWishlist.products.map(product => {
            let combineProducts = productList.find(productId => productId._id.toString() === product.productId);
            combineProducts.quantity = product.quantity;
            return combineProducts;
        });
        res.send({ userWishlist, products });
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.post('/:userId', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userId });
        if (!user) return res.status(404).send('User Not Found!!');
        const data = _.pick(req.body, ['userId', 'productId', 'quantity']);
        user = new wishList({ userId: data.userId, products: [{ productId: data.productId, quantity: data.quantity }] });
        console.log('asdsd', user);
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.put('/updateWishList/:updateId', async (req, res) => {
    try {
        let userWishList = await wishList.findOne({ userId: req.params.updateId });
        if (!userWishList) return res.status(404).send('User Not Found');

        userWishList.products.map(product => {
            return product.quantity = req.body.quantity
        });

        await userWishList.save();
        res.send(userWishList)
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.delete('/deleteWishList/:deleteId', async (req, res) => {
    try {
        const userWishList = await wishList.findByIdAndRemove(req.params.deleteId, {
            $unset: {
                products: {
                    productId: '',
                    quantity: ''
                }
            }
        })
        res.send(userWishList)
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

module.exports = router;