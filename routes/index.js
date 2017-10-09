const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const sanitize = require('../middleware/sanitize-html');
const checkRole = require('../middleware/role-auth');

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
            successRedirect: '/',
            failureRedirect: '/login',
        }
    ));
    app.get('/logout', authController.isLoggedIn, authController.logout);

    app.get('/dashboard', authController.isLoggedIn, userController.dashboard);
    app.get('/post/show/:id',postController.showPost);
    app.get('/post/edit/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), postController.editPost);
    app.post('/post/update/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), sanitize.sanitizeContent, postController.updatePost);
    app.get('/post/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), postController.deletePost);
    app.get('/post/create', authController.isLoggedIn, postController.createPost);
    app.post('/post/create', authController.isLoggedIn, sanitize.sanitizeContent, postController.storePost);
    app.post('/post/activate/:id', authController.isLoggedIn, postController.activatePost);
    app.post('/post/deactivate/:id', authController.isLoggedIn, postController.deactivatePost);

    app.get('/category/create', categoryController.create);
    app.post('/category/create', categoryController.store);
    app.get('/filter', postController.filterPosts);


    app.post('/category/:id', postController.filterPosts);
    


    app.get('/admin/panel', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.panel);

    app.get('/admin/post/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.deletePost);
    app.get('/admin/user/show/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.showUser);
    app.get('/admin/user/edit/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.editUser);
    app.post('/admin/user/update/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.updateUser);
    app.get('/admin/user/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.deleteUser);
}