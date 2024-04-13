const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
class AuthController {
  showLoginForm(req, res, next) {
    res.render("pages/auth/login", {
      pageTitle: "Đăng nhập",
      style: "/auth/login.css",
      script: "/auth/checkFormLogin.js",
    });
  }
}

module.exports = new AuthController();
