const models = require('../models');
const sanitize = require('../middleware/sanitize-html');


exports.home =  async (req, res) => {
    models.category.findAll({ order:[['createdAt', 'DESC']] }).then(category => {
            models.post.findAll({ where: {userId: req.user.userId}, include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
                res.render('users/dashboard/posts/index', {posts: post, categories: category});
            });
        });
};

exports.createPost =  async (req, res) => {
    models.category.findAll({ }).then(category => {
        res.render('users/dashboard/posts/create', {categories: category});
    });
};

exports.storePost = (req, res) => {
    if(req.body.title == ''){
        console.log('please enter title');
        req.flash('info', 'Please enter a title');
        res.redirect('back');
    }else{
        models.post.create(req.body);
        req.flash('success', 'Post created');
        res.redirect('/dashboard/posts')
    }
};

exports.showPost =  async (req, res) => {
    const currentUser = req.user;
    models.post.findById(req.params.id, {include: [models.user, models.category] }).then(post => {
        res.render('posts/show', {post: post, currentUser: currentUser});
    })
};

exports.editPost = async (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findById(req.params.id, {include: [models.category]}).then(post => {
            res.render('users/dashboard/posts/edit', {post: post, categories: category});
        })
    });
};

exports.activatePost = (req, res) => {
    console.log(req.params.id, ' = activated');
    models.post.update({
            status: 'active'
        },{
            where: {
                postId : req.params.id
            }
        });
    res.redirect('back');
};

exports.deactivatePost = (req, res) => {
    console.log(req.params.id, ' = deactivated');
        models.post.update({
            status: 'inactive'
        },{
            where: {
                postId : req.params.id
            }
        });
    res.redirect('back');
};

exports.updatePost = (req, res) => {
    models.post.updatePost(req.body);
    req.flash('success', 'Post updated');
    res.redirect('back');
};

exports.deletePost =  async (req,res) => {
    models.post.delete(req.params.id)
    req.flash('success', 'Post deleted');
    res.redirect('back');
};

exports.filterPosts =  async (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findAll({ where: {categoryId: req.query.category, status: 'active'}, include:[{ model: models.user}, { model: models.category}], order:[['createdAt', 'DESC']] }).then((post) => {
            console.log(req.query.category)
            if(req.path == '/filter/'){
                res.render('index', {posts: post, categories: category});
            }else{
                res.render('blog', {posts: post, categories: category});
            }

        });
    });
}





