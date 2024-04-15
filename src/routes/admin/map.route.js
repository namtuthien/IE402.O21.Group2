const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");

router.get("/", AdminController.show);

module.exports = router;
