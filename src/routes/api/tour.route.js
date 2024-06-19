const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");

router.post("/store", TourController.store);
router.post("/addtour", TourController.store);

router.patch("/edit/:id", TourController.update);

router.delete("/delete/:id", TourController.delete);
router.delete("/destroy", TourController.destroy);

module.exports = router;
