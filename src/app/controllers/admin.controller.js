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
