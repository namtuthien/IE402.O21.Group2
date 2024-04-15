const express = require("express");
const router = express.Router();

const LocationController = require("../../app/controllers/location.controller");

router.get("/getLocations", LocationController.getLocations);

module.exports = router;
