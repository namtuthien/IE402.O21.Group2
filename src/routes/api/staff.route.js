const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");

router.get("/staff/addstaff", AdminController.showAddStaffForm);
router.get("/staff/view/:id", AdminController.showEditStaffForm);
router.post("/staff/addStaff", AdminController.addStaff);
router.patch("/staff/update/:id", AdminController.updateStaffInfo);
router.delete("/staff/deleteStaff/:id", AdminController.deleteUser);

module.exports = router;
