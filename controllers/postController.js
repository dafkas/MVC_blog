const models = require('../models');

exports.createPost = (req, res) => {
    res.render('posts/create');
};

exports.storePost = (req,res) => {
    models.post.create(req.body);
    res.redirect('back');
};



