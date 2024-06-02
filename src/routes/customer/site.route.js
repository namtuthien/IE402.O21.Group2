const express = require("express");
const router = express.Router();

const SiteController = require("../../app/controllers/site.controller");

const checkToken = require("../../app/middlewares/auth.middleware");
const AuthController = require("../../app/controllers/auth.controller");

router.post("/login", AuthController.login.bind(AuthController));
router.get("/login", checkToken, SiteController.showLoginForm);
router.get("/", SiteController.index);

module.exports = router;
