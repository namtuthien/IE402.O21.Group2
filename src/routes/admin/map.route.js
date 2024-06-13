const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/admin.controller");
const TourController = require("../../app/controllers/tour.controller");
router.get("/", AdminController.show);
router.get("/tours", TourController.showToursMap);
module.exports = router;
