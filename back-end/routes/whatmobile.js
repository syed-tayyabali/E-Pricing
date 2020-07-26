const express = require('express');
const { whatmobile } = require('../models/whatmobilModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let size = parseInt(req.query.size);
    let pageNo = parseInt(req.query.pageNo);
    let brand = req.query.brand;
    let priceMax = req.query.priceMax;
    let priceMin = req.query.priceMin;
    let query = {};

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }

    if (priceMax && priceMin) {
        query.price = { $lte: priceMax, $gte: priceMin }
    } else if (priceMax) {
        query.price = { $lte: priceMax }
    } else if (priceMin) {
        query.price = { $gte: priceMin }
    }

    query.heading = new RegExp(".*" + brand + ".*", 'i');

    const mobiles = await whatmobile.find(query).skip(size * (pageNo - 1)).limit(size).select('heading price');
    res.send(mobiles);
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