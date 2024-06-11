const express = require("express");
const router = express.Router();

const SiteController = require("../../app/controllers/site.controller");
const AuthController = require("../../app/controllers/auth.controller");
const { isLoggedIn } = require("../../app/middlewares/auth.middleware");
router.post("/login", AuthController.login.bind(AuthController));
router.post("/logout", AuthController.logout);
router.get("/login", isLoggedIn, SiteController.showLoginForm);
router.get("/", SiteController.index);

module.exports = router;
