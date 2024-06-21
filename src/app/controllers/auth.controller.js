// import libs
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-simple");
const bcrypt = require("bcryptjs");

// import models
const User = require("../models/user.model");

class AuthController {
  // validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // authenticate user info login
  async authenticateUser(email, password) {
    const user = await User.findOne({ user_email: email });

    if (!user) {
      return { success: false, message: "Email hoặc mật khẩu không đúng" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_password);
    if (!isPasswordValid) {
      return { success: false, message: "Mật khẩu không đúng" };
    }

    return { success: true, message: "Xác thực thành công", user };
  }

  // generate secret key
  async generateSecretKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  // generate token
  async generateToken(userId, secretKey) {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Add expiration time to the token
  }

  // save token in cookie
  setTokenCookie(res, token) {
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
  }

  // render page
  determinePageToRender(res, user) {
    switch (user.user_role) {
      case "staff":
        return "/staff/tours";
      case "admin":
        return "/admin/dashboard";
      case "tourguide":
        return "/tourguide/dashboard";
      default:
        return "/";
    }
  }

  // [POST] /register
  async register(req, res, next) {
    try {
      const customerInfo = req.body;

      // Kiểm tra xem email có tồn tại chưa
      const existingEmail = await User.findOne({ user_email: customerInfo.user_email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email đã tồn tại trong hệ thống" });
      }

      // Kiểm tra xem tên đăng nhập có tồn tại chưa
      const existingLoginName = await User.findOne({
        user_login_name: customerInfo.user_login_name,
      });
      if (existingLoginName) {
        return res.status(400).json({ error: "Tên đăng nhập đã tồn tại trong hệ thống" });
      }

      customerInfo.user_password = await bcrypt.hash(customerInfo.user_password, 8);
      const newCustomer = new User(customerInfo);
      await newCustomer.save();
      res.status(201).json({ success: "Tạo tài khoản người dùng thành công" });
    } catch (error) {
      console.error("Error registering user:", error); // Log error for debugging
      res.status(500).json({ error: "Đã có lỗi xảy ra" });
    }
  }

  // [POST] /login
  async login(req, res, next) {
    try {
      const { email, password, remember } = req.body;
      if (!this.isValidEmail(email)) {
        return res.status(401).render("pages/auth/login", {
          pageTitle: "Đăng nhập",
          style: "/pages/auth/login.css",
          script: "/pages/auth/login.js",
          message: "Email không hợp lệ",
        });
      }

      const { success, message, user } = await this.authenticateUser(email, password);

      if (!success) {
        return res.status(401).render("pages/auth/login", {
          pageTitle: "Đăng nhập",
          style: "/pages/auth/login.css",
          script: "/pages/auth/login.js",
          message,
        });
      }

      const secretKey = await this.generateSecretKey();
      const token = await this.generateToken(user._id, secretKey);
      this.setTokenCookie(res, token);
      const pageRender = this.determinePageToRender(res, user);
      res.redirect(pageRender);
    } catch (error) {
      console.error("Error logging in user:", error); // Log error for debugging
      res.status(500).render("pages/auth/login", {
        pageTitle: "Đăng nhập",
        style: "/pages/auth/login.css",
        script: "/pages/auth/login.js",
        message: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
      });
    }
  }

  // [POST] /logout
  async logout(req, res, next) {
    const token = req.cookies.token;
    try {
      const decodedToken = jwtDecode.decode(token, null, true);
      const { userId } = decodedToken;
      const user = await User.findById(userId);
      if (user) {
        res.clearCookie("token");
        return res.status(200).json({ message: "Đăng xuất thành công" });
      }
    } catch (e) {
      return res.status(401).json({ message: "Đăng xuất không thành công" });
    }
  }
}

module.exports = new AuthController();
