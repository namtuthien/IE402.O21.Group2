const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");

router.get("/addstaff", AdminController.showAddStaffForm);
router.get("/view/:id", AdminController.showEditStaffForm);
router.post("/addStaff", AdminController.addStaff);
router.patch("/update/:id", AdminController.updateStaffInfo);
router.delete("/deleteStaff/:id", AdminController.deleteUser);

module.exports = router;
