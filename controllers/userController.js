exports.home =  (req, res) => {
    res.render('index');
};

exports.register =  (req, res) => {
    res.render('users/register');
};

exports.dashboard = (req, res) => {
    res.render('users/dashboard');
};


