const express = require('express');
const router = express.Router();

const tourController = require('../app/controllers/tour.controller');

router.get('/test', (req, res) => {
    res.render('./pages/admin/tour', {
        pageTitle: 'Test',
        style: '/admin/test.css',
        script: '/admin/test.js',
    });
});

router.post('/store', tourController.store);
module.exports = router;