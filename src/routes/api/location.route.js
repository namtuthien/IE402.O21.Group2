const express = require("express");
const router = express.Router();

const LocationController = require("../../app/controllers/location.controller");

router.get("/getLocations", LocationController.getLocations);
router.post("/updateLocation", LocationController.updateLocation);
router.delete("/deleteLocation", LocationController.deleteLocation);

module.exports = router;
