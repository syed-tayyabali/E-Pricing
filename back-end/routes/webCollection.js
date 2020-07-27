const express = require('express');
const router = express.Router();

const { webCollections } = require('../models/WebCollectionModel');

router.get('/', async (req, res) => {
    const webCollection = await webCollections.find().exec();
    res.send(webCollection);
});

module.exports = router;