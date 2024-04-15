const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");

router.post("/store", TourController.store);

module.exports = router;
