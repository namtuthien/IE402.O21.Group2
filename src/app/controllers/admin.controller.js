const User = require("../models/user.model")

class Admin {
  // [GET] /admin/map
  show(req, res, next) {
    res.render("./pages/admin/map/index", {
      pageTitle: "Location",
      style: "/pages/admin/map.css",
      script: "/pages/admin/map.js",
      layout: "map",
    });
  }

  // [GET] /admin/staff/view/:id
  async showEditStaffForm(req, res, next) {
    try {
      const id = req.params.id;
      const staff = await User.findById(id);
      if (!staff) {
        return res.status(404).send('Nhân viên không tồn tại');
        }
      res.render("pages/admin/crud-staff", {
        pageTitle: "Chỉnh sửa thông tin nhân viên",
        style: "/pages/admin/crud-staff.css",
        script: "/pages/admin/crud-staff.js",
        staff: JSON.parse(JSON.stringify(staff))
        // layout: "main",
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Lỗi server")
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

  // [DELETE] /admin/staff/deleteStaff
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).send("Không tìm thấy")
      }

      res.status(200).json({
        message: "Xóa thành công"
      });
    } catch (error) {
      res.status(500).send("Có lỗi khi xóa")
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

  // [POST] /admin/addStaff
  async addStaff(req, res, next) {
    try {
      const staffData = req.body;
      const newStaff = new User(staffData);
      const savedStaff = await newStaff.save();
      res.status(201).json(savedStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi tạo người dùng mới" });
    }
  }

  // [PATCH] /admin/user/update/:id
  async updateStaffInfo(req, res, next) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
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
