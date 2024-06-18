const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const Location = require("../models/location.model");

class Admin {
  // [GET] /admin/customer
  async showCustomers(req, res, next) {
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
      res.render("./pages/admin/customers/index", {
        pageTitle: "Customer",
        style: "/pages/admin/customers.css",
        script: "/pages/admin/customers.js",
        customers: newCustomers,
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  // [GET] /admin/staff/view/:id
  async showEditStaffForm(req, res, next) {
    try {
      const id = req.params.id;
      const staff = await User.findById(id);
      if (!staff) {
        return res.status(404).send("Nhân viên không tồn tại");
      }
      const formattedStaff = {
        ...staff.toObject(),
        user_birthday: staff.user_birthday.toISOString().split("T")[0],
      };
      res.render("pages/admin/crud-staff", {
        pageTitle: "Chỉnh sửa thông tin nhân viên",
        style: "/pages/admin/crud-staff.css",
        script: "/pages/admin/crud-staff.js",
        staff: formattedStaff,
        // layout: "main",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi server");
    }
  }

  // [GET] /admin/staff/addstaff
  async showAddStaffForm(req, res, next) {
    res.render("pages/admin/crud-staff", {
      pageTitle: "Thêm nhân viên",
      style: "/pages/admin/crud-staff.css",
      script: "/pages/admin/crud-staff.js",
      // layout: "main",
    });
  }

  // [DELETE] /admin/staff/deleteStaff/:id
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).send("Không tìm thấy");
      }

      res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      res.status(500).send("Có lỗi khi xóa");
    }
  }

  // [GET] /admin/user/view/:id
  async getStaff(req, res, next) {
    try {
      const staffId = req.params.id;
      console.log(staffId);
      const staff = await User.findById(staffId);
      console.log(staff);
      if (!staff) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy thông tin người dùng" });
    }
  }

  // [POST] /admin/staff/addStaff
  async addStaff(req, res, next) {
    try {
      const staffData = req.body;
      const hashedPassword = await bcrypt.hash(staffData?.user_password, 8);
      staffData.user_password = hashedPassword;
      staffData.user_role = "staff";
      const newStaff = new User(staffData);
      const savedStaff = await newStaff.save();
      res.status(201).json(savedStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi tạo người dùng mới" });
    }
  }

  // [PATCH] /admin/staff/update/:id
  async updateStaffInfo(req, res, next) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      const hashedPassword = await bcrypt.hash(updatedUserData?.user_password, 8);
      updatedUserData.user_password = hashedPassword;
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData);
      if (!updatedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi cập nhật thông tin người dùng" });
    }
  }
}

module.exports = new Admin();
