const models = require('../models')

exports.home = (req, res) => {
    models.category.findAll({ order:[['createdAt', 'DESC']] }).then(category => {
        res.render('users/dashboard/categories', {categories: category});
    });
};

exports.create = (req, res) => {
    res.render('users/dashboard/categories/create');
};

exports.store = (req, res) => {
    console.log(req.body);
    models.category.create(req.body);
    req.flash('success', 'category saved!');
    res.redirect('back');
};

exports.delete = (req, res) => {
    if(req.params.id == 1){
        console.log('cant be deleted');
        req.flash('error', 'This category cant be deleted');
        res.redirect('back');
        return;
    }
    models.category.delete(req.params.id);
    res.redirect('back');
}

