const express = require("express");
const router = express.Router();
const TourController = require("../../app/controllers/tour.controller");

router.get("/tours", TourController.showTours);

module.exports = router;
