// const Joi = require('joi');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
mongoose
    .connect('mongodb://localhost/data')
    .then(() => console.log('connect to database'))
    .catch((err) => console.error('not connected to database', err))

const morgan = require('morgan');
const express = require('express');
const app = express();
const products = require('./routes/Products');
const productType = require('./routes/productType');
const webCollection = require('./routes/webCollection');
const productCompare = require('./routes/productCompare');
const user = require('./routes/user');
const auth = require('./routes/auth');
const wishList = require('./routes/wishList');

app.use(express.json());
app.use(cors());
app.use('/api/products', products);
app.use('/api/productCompare', productCompare);
app.use('/api/productType', productType);
app.use('/api/webcollections', webCollection);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/wishList', wishList);

// app.use(function(req,res,next){
//     console.log('loading');
//     next();
// });
// app.use(function(req,res,next){
//     console.log('authenticating');
//     next();
// });

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enable...');
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening Port${port}...`));