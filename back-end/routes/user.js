const authMiddleWare = require('../middleWare/authMiddleWare');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { userModel, validate } = require('../models/UserModel');

router.get('/me', authMiddleWare, async (req, res) => {
    const user = await userModel.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    try {
        validate(req.body);
        let user = await userModel.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User Already Registered!!');

        user = new userModel(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;