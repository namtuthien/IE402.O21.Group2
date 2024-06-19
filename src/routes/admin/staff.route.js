const express = require("express");

const router = express.Router();

const StaffController = require("../../app/controllers/staff.controller");

router.get("/", StaffController.showStaffs);

module.exports = router;
