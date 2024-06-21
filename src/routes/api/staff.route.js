const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");

router.post("/staff/addStaff", AdminController.addStaff);
router.patch("/staff/update/:id", AdminController.updateStaffInfo);
router.delete("/staff/deleteStaff/:id", AdminController.deleteUser);

module.exports = router;
