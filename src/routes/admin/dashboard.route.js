const express = require('express');

const router = express.Router();

const dashboardController = require('../../app/controllers/dashboard.controller');

router.get('/createStatistical', dashboardController.createStatistical.bind(dashboardController));
router.get('/', dashboardController.show.bind(dashboardController));

module.exports = router;