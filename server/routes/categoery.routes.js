const categoryRouter = require('express').Router();
const Category = require('../models/Category');



categoryRouter.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        return res.status(201).json(savedCategory);
    } catch (error) {
        return res.status(500).send(error);
    }
});



module.exports = categoryRouter;