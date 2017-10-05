const models = require('../models');
const sanitize = require('../middleware/sanitize-html');


exports.createPost = (req, res) => {
    models.category.findAll({ }).then(category => {
        res.render('posts/create', {categories: category});
    });
};

exports.storePost = (req, res) => {
    console.log(req.body);
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
    models.category.findAll({}).then(category => {
        models.post.findById(req.params.id, {include: [models.category]}).then(post => {
                res.render('posts/edit', {post: post, categories: category});
        })
    });
};

exports.updatePost = (req, res) => {
    models.post.updatePost(req.body);
    res.redirect('back');
};

exports.deletePost = (req,res) => {
    models.post.delete(req.params.id)
    res.redirect('/');
};

exports.filterPosts = (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findAll({ where: {categoryId: req.query.category}, include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
            res.render('index', {posts: post, categories: category});
        });
    });
}





