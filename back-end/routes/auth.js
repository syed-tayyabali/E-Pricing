const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const { userModel } = require('../models/UserModel');

router.post('/', async (req, res) => {
    try {
        validate(req.body);
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password!!');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password!!');

        const token = user.generateAuthToken();
        const newUser = user.getUser();
        res.send({ token, ...newUser });

    } catch (e) {
        res.status(400).send(e);
    }
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(255).required()
    });
    try {
        return Joi.assert(req, schema);
    } catch (e) {
        throw e.details[0].message;
    }
}

module.exports = router;