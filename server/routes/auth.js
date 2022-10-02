const Router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');



// REGISTER
Router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    // alternate way to create a new user
    // const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = Router;