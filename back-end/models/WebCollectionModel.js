const mongoose = require('mongoose');

const webCollectionSehema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String }
});

const webCollection = mongoose.model('webCollection', webCollectionSehema, 'webCollection');

module.exports.webCollections = webCollection;