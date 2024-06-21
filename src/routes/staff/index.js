const express = require("express");
const router = express.Router();
const StaffController = require("../../app/controllers/staff.controller");
const RatingController = require("../../app/controllers/rating.controller");
const BookingController = require("../../app/controllers/booking.controller");

// [GET] one customer
router.get("/customer/:user_id", StaffController.getCustomerById);
router.get("/customers", StaffController.getCustomers);
router.get("/tours", StaffController.showTours);

// [GET] all ratings
router.get("/rating/get-all", RatingController.index);
router.get("/ratings", RatingController.showRatings);

// [GET] get booking
router.get("/bookings", BookingController.showBookings);
router.get("/bookings/view/:id", BookingController.showBookingDetail);


module.exports = router;
