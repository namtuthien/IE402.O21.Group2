const express = require("express");

const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");
router.get("/", AdminController.showCustomers);

module.exports = router;
