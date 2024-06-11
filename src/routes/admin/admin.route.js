const express = require("express");
const router = express.Router();
const TourController = require("../../app/controllers/tour.controller");
const AdminController = require("../../app/controllers/admin.controller");
const StaffController = require("../../app/controllers/staff.controller");
router.get("/tours", TourController.showTours);
router.get("/staffs", StaffController.showStaffs);

router.get("/user/view/:id", AdminController.getStaff);
router.post("/addStaff", AdminController.addStaff);
router.patch("/user/update/:id", AdminController.updateStaffInfo);

module.exports = router;
