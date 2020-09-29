const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { wishList } = require('../models/wishListModel');
const { productsModel } = require('../models/ProductsModel');

router.get('/user/:userId', async (req, res) => {
    try {
        const userWishlist = await wishList.find(req.params.userId);

        const productIds = userWishlist.products.map(product => {
            return product.productId;
        });
        const productList = await productsModel.find({ '_id': { $in: productIds } });

        const products = userWishlist.products.map(product => {
            const combineProducts = productList.find(productId => productId._id === product.productId);
            combineProducts.quantity = product.quantity;
            return combineProducts;
        });
        res.send({ userWishlist, products });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/:userId', async (req, res) => {
    try {
        let user = await wishList.findOne(req.params.userId);
        if (!user) return res.status(404).send('User Not Found!!');

        user = new wishList(_.pick(req.body, ['userId', 'products']));
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/updateWishList/:updateId', async (req, res) => {
    try {
        let userWishList = await wishList.findById(req.params.updatedId);
        if (!userWishList) return res.status(404).send('User Not Found');

        userWishList.products.productId = req.body.productId;
        userWishList.products.quantity = req.body.quantity;

        await userWishList.save();
        res.send(userWishList)
    } catch (e) {
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
        res.status(400).send(e);
    }
});

module.exports = router;