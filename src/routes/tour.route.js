const express = require('express');
const router = express.Router();

const tourController = require("../app/controllers/TourController");
const locationController = require("../app/controllers/location.controller")

router.get("/getLocations", locationController.getLocations);
router.get("/location", locationController.show);

module.exports = router;