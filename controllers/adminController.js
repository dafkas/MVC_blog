const User = require('../models/user');

exports.index = (req, res) => {
    // const users = User.findAll().then(users => {
    //         console.log(users);
    // });
    res.render('admin/index');
    //res.render('admin/index', {users: users});
};