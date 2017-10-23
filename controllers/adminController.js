const models = require('../models');

exports.panel = (req, res) => {
    return models.post.findAll({ include: [models.user], order:[['createdAt', 'DESC']] }).then((post) => {
        return models.user.findAll({}).then((user) => {
            res.render('admin/index', {posts: post, users: user});
        });
    });
};

exports.users = (req, res) => {
    return models.user.findAll({}).then((user) => {
        res.render('admin/users/index', {users: user});
    });
}

exports.posts = (req, res) => {
    return models.post.findAll({ include: [models.user], order:[['createdAt', 'DESC']] } ).then((post) => {
        res.render('admin/posts/index', {posts: post});
    });
}

exports.categories = (req, res) => {
    return models.category.findAll({}).then((category) => {
        res.render('admin/categories/index', {categories: category});
    });
}

exports.showUser = (req, res) => {
    models.user.findById(req.params.id, {include: [models.post]}).then(user => {
        models.post.findAll({
            where:{
                userId: user.userId
            }
        }).then((post) => {
            res.render('admin/users/show', {user: user, posts: post});
        });
    });
};

exports.editUser = (req, res) => {
    return models.user.findById(req.params.id).then(user => {
        res.render('admin/users/edit', {user: user});
    });
};

exports.updateUser = (req, res) => {
    models.user.updateUser(req.body);
    req.flash('success', 'User updated');
    res.redirect('back');
};


exports.deleteUser = (req,res) => {
    models.user.delete(req.params.id);
    req.flash('success', 'User deleted');
    res.redirect('back');
};

exports.editPost = (req, res) => {
    models.category.findAll({}).then(category => {
        models.post.findById(req.params.id, {include: [models.category]}).then(post => {
                console.log(post.category.category);
                res.render('admin/posts/edit', {post: post, categories: category});
        })
    });
};

exports.updatePost = (req, res) => {
    models.post.updatePost(req.body);
    req.flash('success', 'Post updated');
    res.redirect('back');
};

exports.deletePost = (req,res) => {
    models.post.delete(req.params.id)
    req.flash('success', 'Post deleted');
    res.redirect('back');
};

exports.deleteCategory = (req, res) => {
    models.category.delete(req.params.id);
    req.flash('success', 'Category deleted');
    res.redirect('back');
};
