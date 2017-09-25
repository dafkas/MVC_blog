const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const postController = require('../controllers/postController');

module.exports = function(app, passport) {

    app.get('/', userController.home);
    app.get('/register',authController.isLoggedOut, userController.register);
    app.post('/register', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            successFlash: 'You are now logged in!',
            failureRedirect: '/register'
        }
    ));
    app.get('/login',authController.isLoggedOut, authController.login);
    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
        }
    ));
    app.get('/logout', authController.isLoggedIn, authController.logout);

    app.get('/dashboard', authController.isLoggedIn, userController.dashboard);
    app.get('/post/create', authController.isLoggedIn, postController.createPost);
    app.post('/post/create', authController.isLoggedIn, postController.storePost);

    app.get('/admin/panel', authController.isLoggedIn, authController.roleAuth('admin'), adminController.panel);
    app.get('/admin/post/edit/:id', authController.isLoggedIn, authController.roleAuth('admin'),postController.editPost);
    app.get('/admin/post/delete/:id', authController.isLoggedIn, authController.roleAuth('admin'), adminController.deletePost);
    app.get('/admin/user/show/:id', authController.isLoggedIn, authController.roleAuth('admin'), adminController.showUser);
    app.get('/admin/user/edit/:id', authController.isLoggedIn, authController.roleAuth('admin'), adminController.editUser);
    app.post('/admin/user/update/:id', authController.isLoggedIn, authController.roleAuth('admin'), adminController.updateUser);
    app.get('/admin/user/delete/:id', authController.isLoggedIn, authController.roleAuth('admin'), adminController.deleteUser);
}