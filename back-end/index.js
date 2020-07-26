// const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data')
    .then(() => console.log('connect to database'))
    .catch((err)=> console.error('not connected to database', err))

const morgan = require('morgan');
const express = require('express');
const app = express();
const whatmobile = require('./routes/whatmobile');

app.use(express.json());
app.use('/api/whatmobile', whatmobile)

// app.use(function(req,res,next){
//     console.log('loading');
//     next();
// });
// app.use(function(req,res,next){
//     console.log('authenticating');
//     next();
// });

app.get('/', (req, res) => {
    res.send('hello');
});

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enable...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening {$port}...'));