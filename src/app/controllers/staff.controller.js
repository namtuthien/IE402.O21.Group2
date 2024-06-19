// import models
const User = require("../models/user.model");
const Tour = require("../models/tour.model");

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
  // [GET] /staffs/customers
  async getCustomers(req, res, next) {
    try {
      const customers = await User.find({ user_role: "customer" });
      if (!customers) {
        return res.status(404).json({
          message: "Tour not found!",
        });
      }
      var newCustomers = [];
      customers.forEach((tour) => {
        newCustomers.push(tour.toObject());
      });
      res.render("./pages/staff/customers/index", {
        pageTitle: "Customer",
        style: "/pages/staff/customers.css",
        script: "/pages/staff/customers.js",
        customers: newCustomers,
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // [GET] /staffs
  async showStaffs(req, res, next) {
    try {
      const staffs = await User.find({ user_role: "staff" });

      if (!staffs || staffs.length === 0) {
        return res.status(404).json({
          message: "Staff not found!",
        });
      }

      const newStaffs = staffs.map((staff) => ({
        ...staff.toObject(),
        user_birthday: staff.user_birthday ? staff.user_birthday.toISOString().split("T")[0] : null,
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
  // [GET] /staff/tours
  async showTours(req, res, next) {
    try {
      const tours = await Tour.find();
      if (!tours) {
        return res.status(404).json({
          message: "Tour not found!",
        });
      }
      var newTours = [];
      tours.forEach((tour) => {
        newTours.push(tour.toObject());
      });
      return res.status(200).render("pages/staff/tours/index", {
        pageTitle: "Danh sách tour",
        style: "/pages/staff/tours.css",
        script: "/pages/staff/tours.js",
        tours: newTours,
        mapLink: "/staff/map/tours",
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
