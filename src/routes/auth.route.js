const express = require('express');

const router = express.Router();

const authController = require("../app/controllers/auth.controller");

router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);


module.exports = router;