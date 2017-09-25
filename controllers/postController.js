const models = require('../models');

exports.createPost = (req, res) => {
    res.render('posts/create', {users: req.user.userId});
};

exports.storePost = (req,res) => {
    models.post.create(req.body);
    res.redirect('back');
};

exports.showPost = (req, res) => {
    models.post.findById(req.params.id, {include: [models.user] }).then(post => {
        res.render('posts/show', {post: post});
    })
    // res.render('posts/show')
};

exports.editPost = (req, res) => {
    models.post.findById(req.params.id).then(post => {
            res.render('posts/edit', {post: post});
    })
};

exports.updatePost = (req, res) => {
    models.post.updatePost(req.body);
    res.redirect('back');
};




