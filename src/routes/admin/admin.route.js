const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");
const LocationController = require("../../app/controllers/location.controller");
const AdminController = require("../../app/controllers/admin.controller");
const StaffController = require("../../app/controllers/staff.controller");
const BookingController = require("../../app/controllers/booking.controller");

router.get("/tours", TourController.showTours);
router.get("/locations", LocationController.showLocations);
router.get("/bookings", BookingController.showBookings);
router.get("/bookings/view/:id", BookingController.showBookingDetail);
router.patch("/bookings/update/:id", BookingController.update);
router.patch("/bookings/delete/:id", BookingController.delete);
router.get("/staffs", StaffController.showStaffs);
router.get("/staff/addstaff", AdminController.showAddStaffForm);
router.get("/staff/view/:id", AdminController.showEditStaffForm);

router.post("/staff/addStaff", AdminController.addStaff);

router.patch("/staff/update/:id", AdminController.updateStaffInfo);

router.delete("/staff/deleteStaff/:id", AdminController.deleteUser);

module.exports = router;
