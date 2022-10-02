const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// update the user or update the user's password
userRouter.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
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





module.exports = userRouter;