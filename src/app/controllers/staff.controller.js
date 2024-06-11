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
  async showStaffs(req, res, next) {
    try {
      return res.status(200).render("pages/admin/staffs", {
        pageTitle: "Danh sách nhân viên",
        style: "/pages/admin/staffs.css",
        script: "/pages/admin/staffs.js",

        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new StaffController();
