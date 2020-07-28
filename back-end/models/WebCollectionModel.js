const mongoose = require('mongoose');

const webCollectionSehema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    type: { type: Number }
});

const webCollection = mongoose.model('webCollection', webCollectionSehema, 'webCollection');

function query(req){
    let type = req.params.typeId;
    let query = {};
    if(type){
        query.type = type;
    }
    return query;
}

module.exports.query = query;
module.exports.webCollections = webCollection;