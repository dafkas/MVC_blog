const models = require('../models');

exports.home =  (req, res) => {
    models.post.findAll({ include:[models.user], order:[['createdAt', 'DESC']] }).then((post) => {
        res.render('index', {posts: post});
    });
};

exports.register =  (req, res) => {
    res.render('users/register');
};

exports.dashboard = (req, res) => {
    res.render('users/dashboard');
};
