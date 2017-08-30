const express = require('express');
const router =  express.Router();
const photoController = require('../controllers/photoController')

//Homepage
router.get('/', photoController.homePage);

router.get('/:page', (req, res) => {
    const page = req.params.page;
    res.send('welkom op de ' + page + ' pagina');
});

module.exports = router;