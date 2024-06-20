const express = require("express");
const router = express.Router();

const LocationController = require("../../app/controllers/location.controller");
const TourController = require("../../app/controllers/tour.controller");

router.get("/locations", LocationController.showLocationsMap);
router.get("/tours", TourController.showToursMap);

module.exports = router;
