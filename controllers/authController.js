const models = require('../models')

exports.login = (req, res) => {
    res.render('users/login');
};

exports.logout = (req, res) => {
    //passport logout
    req.logout();
    //throw message
    req.flash('success', 'Successfully logged out!');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    //check if user is loggedIn
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You must be logged in to do that!');
        res.redirect('/login');
    }
};

exports.isLoggedOut = (req, res, next) => {
    //check if user is logged out
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};
