// import models
const User = require("../models/user.model");

class StaffController {
  // [GET] /staffs/customer/:user_id
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
  async showStaffs(req, res, next) {
    try {
      const staffs = await User.find({ user_role: 'staff' });
  
      if (!staffs || staffs.length === 0) { 
        return res.status(404).json({
          message: "Staff not found!",
        });
      }
      
      const newStaffs = staffs.map((staff) => ({
        ...staff.toObject(), 
        user_birthday: staff.user_birthday ? staff.user_birthday.toISOString().split('T')[0] : null 
      }));
  
      return res.status(200).render("pages/admin/staffs", {
        pageTitle: "Danh sách nhân viên",
        style: "/pages/admin/staffs.css",
        script: "/pages/admin/staffs.js",
        layout: "main",
        staffs: newStaffs,
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new StaffController();
