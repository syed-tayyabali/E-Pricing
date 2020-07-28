const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { products, query } = require('../models/ProductsModel');

//ALL PRODUCT LISTENIG
router.get('/', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    const productList = await products.find(query(req)).skip(size * (pageNo - 1)).limit(size).select('heading price');
    // console.log(product);
    res.send(productList);
});

//SPECIFIC PRODUCT DESCRIPTION
router.get('/:id', async (req, res) => {
    var _id = new mongoose.Types.ObjectId(req.params.id);
    const product = await products.findOne({ _id }).select('heading price product_url productSmallImg productLargeImg description');
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

    const productList = await products.find(query(req)).skip(size * (pageNo - 1)).limit(size).select('type heading price');
    res.send(productList);
});

router.get('/webCollection/:seller_keyID', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    const webCollectionProductList = await products.find(query(req)).skip(size * (pageNo - 1)).limit(size).select('seller_keyID seller_key heading price')
    res.send(webCollectionProductList);
})

router.get('/type/:typeId/:seller_keyID', async (req, res) => {
    let size = parseInt(req.query.size) || 20;
    let pageNo = parseInt(req.query.pageNo);

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    const productList = await products.find(query(req)).skip(size * (pageNo - 1)).limit(size).select('type seller_keyID seller_key heading price');
    res.send(productList);
});

// router.get('/', (req, res) => {
//     res.send(courses);
// });

// router.get('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) {
//         res.status(404).send('the course with the id not found');
//         return;
//     }
//     res.send(course);
// });

// router.post('/', (req, res) => {
//     // const { error } = validateCourse(req.body);
//     // if (error) {
//     //     res.status(400).send(result.error.details[0].message);
//     //     return;
//     // }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course)
// });

// router.put('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) {
//         res.status(404).send('the course with the id not found');
//         return;
//     }

//     // const {error} = validateCourse(req.body);
//     // if (error) {
//     //     res.status(400).send(result.error.details[0].message);
//     //     return;
//     // }

//     course.name = req.body.name;
//     res.send(course);
// });

// router.delete('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) {
//         res.status(404).send('the course with the id not found');
//         return;
//     }

//     const index = courses.indexOf(course);
//     courses.splice(index, 1);
//     res.send(course);
// })

// // function validateCourse(course) {
// //     const schema = {
// //         name: Joi.string().min(3).required()
// //     };
// //     return Joi.validate(course, schema);
// // }

module.exports = router;