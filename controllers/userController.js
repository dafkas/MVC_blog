const models = require('../models');

exports.home =  (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findAll({ where: {status: 'active'}, include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
            res.render('index', {posts: post, categories: category});
        });
    });
};

exports.register =  (req, res) => {
    res.render('users/register');
};

exports.dashboard = (req, res) => {
    models.category.findAll({ order:[['createdAt', 'DESC']] }).then(category => {
        models.post.findAll({ where: {userId: req.user.userId}, include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
            res.render('users/dashboard/index', {posts: post, categories: category});
        });
    });
};
