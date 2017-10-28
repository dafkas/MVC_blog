const models = require('../models');

exports.panel = async (req, res) => {
    //find all posts Join on user model, Eager loading..
    return models.post.findAll({ include: [models.user], order:[['createdAt', 'DESC']] }).then((post) => {
        return models.user.findAll({}).then((user) => {
            res.render('admin/index', {posts: post, users: user});
        });
    });
};

exports.users = async (req, res) => {
    //find all users
    return models.user.findAll({}).then((user) => {
        res.render('admin/users/index', {users: user});
    });
}

exports.posts = async (req, res) => {
    //find all posts
    return models.post.findAll({ include: [models.user], order:[['createdAt', 'DESC']] } ).then((post) => {
        res.render('admin/posts/index', {posts: post});
    });
}

exports.categories = async (req, res) => {
    //find all categories
    return models.category.findAll({}).then((category) => {
        res.render('admin/categories/index', {categories: category});
    });
}

exports.showUser = async (req, res) => {
    //find user by id and join, Eager loading posts by user
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

exports.editUser = async (req, res) => {
    //find user by Id with get param
    return models.user.findById(req.params.id).then(user => {
        res.render('admin/users/edit', {user: user});
    });
};

exports.updateUser = (req, res) => {
    //model update function
    models.user.updateUser(req.body);
    //throw message
    req.flash('success', 'User updated');
    res.redirect('back');
};


exports.deleteUser = async (req,res) => {
    //model delete function
    models.user.delete(req.params.id);
    //throw message
    req.flash('success', 'User deleted');
    res.redirect('back');
};

exports.editPost = async (req, res) => {
    //find all categories for select field
    models.category.findAll({}).then(category => {
        //find posts join, category by post
        models.post.findById(req.params.id, {include: [models.category]}).then(post => {
                res.render('admin/posts/edit', {post: post, categories: category});
        })
    });
};

exports.updatePost = (req, res) => {
    //model function
    models.post.updatePost(req.body);
    //throw message
    req.flash('success', 'Post updated');
    res.redirect('back');
};

exports.deletePost = (req,res) => {
    //model function
    models.post.delete(req.params.id)
    //throw message
    req.flash('success', 'Post deleted');
    res.redirect('back');
};

exports.deleteCategory = (req, res) => {
    //model function
    models.category.delete(req.params.id);
    //throw message
    req.flash('success', 'Category deleted');
    res.redirect('back');
};
