const express = require("express");
const router = express.Router();

const BookingController = require("../../app/controllers/booking.controller");

router.patch("/update/:id", BookingController.update);
router.patch("/delete/:id", BookingController.delete);

module.exports = router;
