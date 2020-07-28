const express = require('express');
const router = express.Router();

const { webCollections, query } = require('../models/WebCollectionModel');

router.get('/', async (req, res) => {
    const webCollection = await webCollections.find().exec();
    res.send(webCollection);
});

router.get('/:typeId', async (req,res) => {
    const webCollection = await webCollections.find(query(req)).select('type name');
    console.log(req.params.typeId);
    
    if(!webCollection){
        return res.status(404).send('webCollection not found!');
    }
    res.send(webCollection);
});

module.exports = router;