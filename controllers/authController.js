const models = require('../models')

exports.login = (req, res) => {
    res.render('users/login');
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.isLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

exports.roleAuth = (role) => {
    return (req, res, next) =>{
        console.log(req.params.id, req.user.role, req.user.userId)
        models.post.findById(req.params.id).then(post => {
            if(role.indexOf(req.user.role) > -1){
                console.log(post.userId, req.user.userId)
                if(req.user.role == 'admin' || req.user.userId == post.userId){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        });
    }
}