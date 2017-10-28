const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const sanitize = require('../middleware/sanitize-html');
const checkRole = require('../middleware/role-auth');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function(app, passport) {

    app.get('/', catchErrors(userController.home));
    app.get('/blog', userController.blog);
    app.get('/register',authController.isLoggedOut, userController.register);

    app.post('/register', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            successFlash: 'You are now logged in!',
            failureRedirect: '/register',
            // failureFlash: 'Email adress is already taken',
        }
    ));
    
    app.get('/login',authController.isLoggedOut, authController.login);
    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: 'Username or password invalid',
            successFlash: 'You are now logged in!'
        }
    ));

    app.get('/logout', authController.isLoggedIn, authController.logout);

    app.get('/dashboard', authController.isLoggedIn, catchErrors(userController.dashboard));
    app.get('/dashboard/posts', authController.isLoggedIn, catchErrors(postController.home));
    app.get('/post/show/:id', catchErrors(postController.showPost));
    app.get('/dashboard/post/edit/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), catchErrors(postController.editPost));
    app.post('/dashboard/post/update/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), sanitize.sanitizeContent, postController.updatePost);
    app.get('/dashboard/post/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), catchErrors(postController.deletePost));
    app.get('/dashboard/post/create', authController.isLoggedIn,  catchErrors(postController.createPost));

    app.post('/dashboard/post/create', authController.isLoggedIn, sanitize.sanitizeContent, postController.storePost);
    app.post('/post/activate/:id', authController.isLoggedIn, postController.activatePost);
    app.post('/post/deactivate/:id', authController.isLoggedIn, postController.deactivatePost);
    
    app.get('/dashboard/categories',authController.isLoggedIn, catchErrors(categoryController.home));

    app.get('/dashboard/category/create', authController.isLoggedIn, catchErrors(categoryController.create));
    app.post('/dashboard/category/create',authController.isLoggedIn, categoryController.store);

    app.get('/dashboard/category/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin', 'regular']), categoryController.delete);
    
    app.get('/filter', postController.filterPosts);
    app.get('/blog/filter', postController.filterPosts);
    app.post('/category/:id', postController.filterPosts);
    


    app.get('/admin/panel', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.panel);
    app.get('/admin/users', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.users);
    app.get('/admin/posts', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.posts);
    app.get('/admin/categories', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.categories);
    app.get('/admin/category/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.deleteCategory);

    app.get('/admin/post/edit/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.editPost);
    app.post('/admin/post/update/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), sanitize.sanitizeContent, adminController.updatePost);
    app.get('/admin/post/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.deletePost);
    app.get('/admin/user/show/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.showUser);
    app.get('/admin/user/edit/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.editUser);
    app.post('/admin/user/update/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.updateUser);
    app.get('/admin/user/delete/:id', authController.isLoggedIn, checkRole.roleAuth(['admin']), adminController.deleteUser);
}