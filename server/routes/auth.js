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



// LOGIN
Router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        const { password, ...otherProp } = user._doc;
        return res.status(200).send(otherProp);
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = Router;