const express = require("express");
const router = express.Router();
const TourGuideController = require("../../app/controllers/tour-guide.controller");
router.get("/get-customers", TourGuideController.getAllCustomers);

module.exports = router;
