const models = require('../models').User

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
        if(req.user.role == role){
            next();
        }else{
            res.redirect('/dashboard');
        }
    }
}