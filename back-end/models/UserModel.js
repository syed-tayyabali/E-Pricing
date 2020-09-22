const mongoose = require('mongoose');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
    return token;
}

const users = mongoose.model('users', usersSchema, 'Users_tb');

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions)
    });
    try {
        return Joi.assert(user, schema);
    } catch (e) {
        throw e.details[0].message;
    }
}

module.exports.userModel = users;
module.exports.validate = validateUser;