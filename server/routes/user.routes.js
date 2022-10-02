const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');









// update the user or update the user's password
userRouter.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).send(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            return res.status(200).send('User has been updated');
        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        return res.status(403).send('You can only update your account');
    }
});



// delete the user or delete the user's account
userRouter.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                const user = await User.findByIdAndDelete(req.params.id);
                return res.status(200).send('User has been deleted');
            } catch (err) {
                return res.status(500).send(err);
            }
        } catch (error) {
            return res.status(500).send("User not found");
        }

    } else {
        return res.status(403).send('You can only delete your account');
    }
});

module.exports = userRouter;