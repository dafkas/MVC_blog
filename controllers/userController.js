exports.home =  (req, res) => {
    res.render('index');
};

exports.register =  (req, res) => {
      if(req.isAuthenticated()){
        res.redirect('/dashboard');
    }
    else{
        res.render('users/register');
    }
};

exports.dashboard = (req, res) => {
    res.render('users/dashboard');
};


