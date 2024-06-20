const express = require("express");
const router = express.Router();

const BookingController = require("../../app/controllers/booking.controller");

router.get("/", BookingController.showBookings);
router.get("/view/:id", BookingController.showBookingDetail);

module.exports = router;
