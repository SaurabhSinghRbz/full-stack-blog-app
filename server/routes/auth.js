const Router = require('express').Router();
const User = require('../models/User');

// REGISTER
Router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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