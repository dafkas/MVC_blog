const models = require('../models')

exports.login = (req, res) => {
    res.render('users/login');
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/');
    // req.session.destroy((err) => {
    //     res.redirect('/');
    // });
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You must be logged in to do that!');
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
