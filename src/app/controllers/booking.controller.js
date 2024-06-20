// import models
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Tour = require("../models/tour.model");
const Payment = require("../models/payment.model");
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
          layout: "main",
        });
      } catch (err) {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }

    async showBookingDetail(req, res, next) {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).send("Booking không tồn tại");
            }
            const payment = await Payment.findById(booking.payment_id);
            if (!payment) {
                return res.status(404).send("Không tìm thấy payment được tham chiếu");
            }
            booking.payment_id = payment;
            return res.status(200).render("pages/admin/bookings/booking-details", {
                pageTitle: "Chi tiết Đặt Tour",
                style: "/pages/admin/booking-details.css",
                script: "/pages/admin/booking-details.js",
                booking: JSON.parse(JSON.stringify(booking)),
                layout: "main",
            })
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
            })
        }
    }

    async update(req, res, next) {
        try {
            const bookingId = req.params.id;
            const newBooking = req.body;
            const data = await Booking.findByIdAndUpdate(bookingId, newBooking);
            if (!data) {
                return res.status(500).send("Lỗi khi cập nhật");
            }
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        }
    }

    async delete(req, res, next) {
        try {
            const bookingId = req.params.id;
            const deletedBooking = await Booking.findById(bookingId);
            if (!deletedBooking) {
                return res.status(404).send("Booking này không tồn tại");
            }
            deletedBooking.booking_removed = true;
            const data = await Booking.findByIdAndUpdate(bookingId, deletedBooking);
            if (!data) {
                return res.status(500).send("Lỗi khi cập nhật");
            }
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        }
    }
}
module.exports = new BookingController();
