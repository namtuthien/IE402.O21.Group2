const express = require("express");

const router = express.Router();

const StaffController = require("../../app/controllers/staff.controller");
const AdminController = require("../../app/controllers/admin.controller");

router.get("/", StaffController.showStaffs);
router.get("/addstaff", AdminController.showAddStaffForm);
router.get("/view/:id", AdminController.showEditStaffForm);

module.exports = router;
