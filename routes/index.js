const express = require('express');
const router =  express.Router();
const photoController = require('../controllers/photoController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

//Homepage
router.get('/', photoController.homePage);

//User routes
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

router.get('/login', userController.loginPage);

//Admin routes
router.get('/admin', adminController.index);

// router.get('/:page', (req, res) => {
//     const page = req.params.page;
//     res.send(`welkom op de ${page} pagina`);
// });

module.exports = router;