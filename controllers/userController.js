const promisify = require('es6-promisify');
const User = require('../models/Users');

exports.registerPage = (req, res) => {
    res.render('users/register');
};

exports.register =  async (req, res, next) => {
    const input = JSON.parse(JSON.stringify(req.body));
    
    const data = {
        name : input.name,
        email : input.email,
        password : input.password
    };

    res.redirect('back');
};

exports.loginPage = (req, res) => {
    res.render('users/login');
};

