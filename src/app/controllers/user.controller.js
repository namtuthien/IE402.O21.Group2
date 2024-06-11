const User = require("../models/user.model")

class UserController {
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

    // [GET] /admin/staff/add
    showAddStaffForm(req, res, next) {
        res.render("pages/admin/add-staff", {
            pageTitle: "Thêm nhân viên",
            style: "/pages/admin/add-staff.css",
            script: "/pages/admin/add-staff.js",
            // layout: "main",
        });
    }
}

module.exports = new UserController();