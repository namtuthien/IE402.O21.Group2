// import models
const User = require("../models/user.model");

class StaffController {
  // [GET] /staff/customer/:user_id
  async getCustomerById(req, res, next) {
    const { user_id } = req.params;
    try {
      const customer = await User.findOne({ _id: user_id }).select("-user_password");
      if (customer.user_role !== "customer") {
        res.status(403).json({ error: "Bạn không được phép xem thông tin" });
      } else {
        res.status(200).json(customer);
      }
    } catch (error) {
      res.status(500).json({ error: "Lỗi truy xuất người dùng" });
    }
  }
  // [GET] /staff/tourguides/location/show
  async showRealTimeLocation(req,res,next) {
    res.render("./pages/staff/test", {
      pageTitle: "Xem vị trí",
      style: "/pages/admin/map.css",
      script: "/pages/staff/map.js",
      layout: "map",
    });
  }
}

module.exports = new StaffController();
