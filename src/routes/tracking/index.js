const express = require("express");
const router = express.Router();
const StaffController = require("../../app/controllers/staff.controller");

// [GET] get map
router.get("/tourguides", StaffController.showRealTimeLocation);

module.exports = router;
