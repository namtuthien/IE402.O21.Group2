// import models
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Tour = require("../models/tour.model");
class BookingController {  // [GET] /admin/bookings
    async showBookings(req, res, next) {
      try {
        const bookings = await Booking.find();
        if (!bookings) {
          return res.status(404).json({
            message: "Booking not found!",
          });
        }
        var newBooking = [];
        for (let i = 0; i < bookings.length; i++) {
            const customer = await User.findById(bookings[i].customer);
            bookings[i].customer = customer ? customer : null;
            const tour = await Tour.findById(bookings[i].tour);
            bookings[i].tour = tour ? tour : null;
            newBooking.push(bookings[i].toObject());
        }
        // var newBooking = [];
        // bookings.forEach((booking) => {
        //   newBooking.push(booking.toObject());
        // });
        return res.status(200).render("pages/admin/bookings/index", {
          pageTitle: "Danh sách Booking",
          style: "/pages/admin/bookings.css",
          script: "/pages/admin/bookings.js",
          bookings: newBooking,
          mapLink: "/admin/map/bookings",
          layout: "main",
        });
      } catch (err) {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
}
module.exports = new BookingController();
