const models = require('../models');

exports.panel = (req, res) => {
    return models.post.findAll({}).then((post) => {
        return models.user.findAll({}).then((user) => {
            res.render('admin/panel', {posts: post, users: user});
        });
    });
};

exports.showUser = (req, res) => {
    return models.user.findById(req.params.id).then(user => {
        res.render('admin/users/show', {user: user});
    });
};

exports.editUser = (req, res) => {
    return models.user.findById(req.params.id).then(user => {
        res.render('admin/users/edit', {user: user});
    });
};

exports.updateUser = (req, res) => {
    models.user.updateUser(req.body);
    res.redirect('back');
};


exports.deleteUser = (req,res) => {
    models.user.delete(req.params.id);
    res.redirect('back');
};

exports.deletePost = (req,res) => {
    models.post.delete(req.params.id)
    res.redirect('back');
};
