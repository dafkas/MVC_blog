const models = require('../models');

exports.home =  (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findAll({ include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
            res.render('index', {posts: post, categories: category});
        });
    });
};

exports.register =  (req, res) => {
    res.render('users/register');
};

exports.dashboard = (req, res) => {
    res.render('users/dashboard');
};
