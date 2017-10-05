const models = require('../models')

exports.create = (req, res) => {
    res.render('categories/create');
};

exports.store = (req, res) => {
    models.category.create(req.body);
    res.redirect('back');
}

