const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");

router.post("/store", TourController.store);
router.post("/tour/addtour", TourController.store);

router.patch("/tour/edit/:id", TourController.update);

router.delete("/tour/delete/:id", TourController.delete);
router.delete("/tour/destroy", TourController.destroy);

module.exports = router;
