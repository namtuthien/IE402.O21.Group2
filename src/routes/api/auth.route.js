const express = require("express");
const router = express.Router();

const AuthController = require("../../app/controllers/auth.controller");

router.post("/login", AuthController.login.bind(AuthController));

module.exports = router;
