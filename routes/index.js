const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

module.exports = function(app, passport) {

    app.get('/', userController.home);
 
    app.get('/register',authController.isLoggedOut, userController.register);
 
    app.get('/login',authController.isLoggedOut, authController.login);

    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/login'
        }
    ))

    app.post('/register', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/register'
        }
    ))
    app.get('/dashboard', authController.isLoggedIn, userController.dashboard);

    app.get('/logout', authController.logout);

}