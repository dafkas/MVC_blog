const models = require('../models');

exports.createPost = (req, res) => {
    res.render('posts/create', {users: req.user.userId});
};

exports.storePost = (req,res) => {
    models.post.create(req.body);
    res.redirect('back');
};

exports.editPost = (req, res) => {
    res.render('posts/edit')
};



