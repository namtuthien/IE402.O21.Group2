const express = require("express");
const router = express.Router();

const LocationController = require("../../app/controllers/location.controller");

router.get("/", LocationController.showLocations);

module.exports = router;
