const models = require('../models');
const sanitize = require('../middleware/sanitize-html');


exports.createPost = (req, res) => {
    res.render('posts/create', {users: req.user.userId});
};

exports.storePost = (req, res) => {
    // console.log(req.body.content);
    models.post.create(req.body);
    res.redirect('/')
};

exports.showPost = (req, res) => {
    const currentUser = req.user;
    models.post.findById(req.params.id, {include: [models.user]}).then(post => {
        res.render('posts/show', {post: post, currentUser: currentUser});
    })
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

exports.deletePost = (req,res) => {
    models.post.delete(req.params.id)
    res.redirect('/');
};





