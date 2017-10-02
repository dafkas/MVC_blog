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
