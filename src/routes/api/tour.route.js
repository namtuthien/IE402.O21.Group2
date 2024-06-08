const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");

router.post("/store", TourController.store);
router.get("/getTours", TourController.getTours);
router.get("/getLinesOfTour/:routes", TourController.getLinesOfTour);
router.get("/add", TourController.showAddTourForm);
router.get("/edittour", TourController.showTourDetailForm);

module.exports = router;
