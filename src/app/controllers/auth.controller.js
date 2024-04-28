// import libs
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import models
const User = require("../models/user.model");

class AuthController {
  // validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  // authen user info login
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

  // generate secretkey
  async generateSecretKey() {
    return await crypto.randomBytes(32).toString("hex");
  }

  // generate token
  async generateToken(userId, secretKey) {
    return await jwt.sign({ userId }, secretKey);
  }

  // save token in cookie
  async setTokenCookie(res, token) {
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
  }

  // render page
  async determinePageToRender(user) {
    switch (user.user_role) {
      case "customer":
        return "pages/customer/test.hbs";
      case "staff":
        return "pages/staff/test.hbs";
      case "admin":
        return "pages/admin/test.hbs";
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
      if (remember) {
        const secretKey = await this.generateSecretKey();
        const token = await this.generateToken(user._id, secretKey);
        await this.setTokenCookie(res, token);
      }

      const pageRender = await this.determinePageToRender(user);
      res.status(200).render(pageRender);
    } catch (error) {
      res.status(500).send({
        message: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
      });
    }
  }
}

module.exports = new AuthController();
