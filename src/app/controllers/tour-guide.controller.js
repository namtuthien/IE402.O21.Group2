// import models
const { response } = require("express");
const User = require("../models/user.model");

class TourGuideController {
  // [GET] /tour-guide/get-customers
  async getAllCustomers(req, res, next) {
    try {
      const customers = await User.find({ user_role: "customer" }).select("-user_password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: "Lỗi truy xuất danh sách người dùng" });
    }
  }
}

module.exports = new TourGuideController();
