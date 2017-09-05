const User = require('../models/Users');

exports.index = (req, res) => {
    const users = User.findAll().then(users => {
    });
    res.render('admin/index', {users: users});
};