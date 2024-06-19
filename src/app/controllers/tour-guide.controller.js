// import models
const { response } = require("express");
const User = require("../models/user.model");
const TourLog = require("../models/tour-log.model");
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
  // [GET] /tour-guide/
  async showTourGuide(req,res,next) {
    res.render("pages/tourguide/index", {
      pageTitle: "Hướng dẫn viên",
      style: "/pages/tourguide/map.css",
      script: "/pages/tourguide/map.js",
      layout:"tour-guide",
    });
  }
  // [POST] /tour-guide/tour-log/store
  async storeTourLog(req, res, next) {
    try {
      console.log(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = new TourGuideController();
