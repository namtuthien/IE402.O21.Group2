const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/auth.controller");
const checkToken = require("../app/middlewares/auth.middleware");
router.get("/login", checkToken, authController.showLoginForm);
router.post("/login", authController.login.bind(authController));

module.exports = router;
