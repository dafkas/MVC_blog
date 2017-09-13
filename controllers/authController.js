exports.login = (req, res) => {
    res.render('users/login');
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // carry on! They are logged in!
        return;
    } else {
        res.redirect('/login');
    }
}