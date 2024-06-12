const express = require("express");
const router = express.Router();
const TourController = require("../../app/controllers/tour.controller");
const AdminController = require("../../app/controllers/admin.controller");
const StaffController = require("../../app/controllers/staff.controller");
router.get("/tours", TourController.showTours);
router.get("/staffs", StaffController.showStaffs);

router.delete('/staff/deleteStaff/:id', AdminController.deleteUser)
router.get('/staff/addstaff', AdminController.showAddStaffForm)
router.get("/staff/view/:id", AdminController.showEditStaffForm);
router.post("/staff/addStaff", AdminController.addStaff);
router.patch("/staff/update/:id", AdminController.updateStaffInfo);

module.exports = router;
