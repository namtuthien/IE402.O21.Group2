const express = require("express");
const router = express.Router();
const StaffController = require("../../app/controllers/staff.controller");
router.get("/customer/:user_id", StaffController.getCustomerById);

module.exports = router;
