const models = require('../models')

exports.home = async (req, res) => {
    //find all categories
    models.category.findAll({ order:[['createdAt', 'DESC']] }).then(category => {
        res.render('users/dashboard/categories', {categories: category});
    });
};

exports.create = async (req, res) => {
    res.render('users/dashboard/categories/create');
};

exports.store = (req, res) => {
    //create category
    models.category.create(req.body);
    req.flash('success', 'Category saved!');
    res.redirect('back');
};

exports.delete = (req, res) => {
    //check if category is 1, standard category(No category) cant be deleted 
    //otherwise delete
    if(req.params.id == 1){
        console.log('cant be deleted');
        req.flash('error', 'This category cant be deleted');
        res.redirect('back');
        return;
    }
    models.category.delete(req.params.id);
    req.flash('success', 'Category deleted!');
    res.redirect('back');
}

