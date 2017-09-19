const models = require('../models');

exports.panel = (req, res) => {
    return models.post.findAll({}).then((post) => {
        return models.user.findAll({}).then((user) => {
            res.render('admin/panel', {posts: post, users: user});
        });
    });
};

exports.deletePost = (req,res) => {
    models.post.delete(req.params.id)
    res.redirect('back');
};

exports.deleteUser = (req,res) => {
    models.user.delete(req.params.id);
    res.redirect('back');
};