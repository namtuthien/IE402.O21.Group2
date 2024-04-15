const express = require("express");
const router = express.Router();

const AuthController = require("../../app/controllers/auth.controller");
const checkToken = require("../../app/middlewares/auth.middleware");

router.get("/login", checkToken, AuthController.showLoginForm);
router.post("/login", AuthController.login.bind(AuthController));

module.exports = router;
