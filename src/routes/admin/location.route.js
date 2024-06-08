const express = require("express");
const router = express.Router();

const LocationController = require("../../app/controllers/location.controller");

router.post("/store", LocationController.store);

module.exports = router;
