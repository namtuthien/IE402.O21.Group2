const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const bookingModel = require("../models/booking.model");
const ratingModel = require("../models/rating.model");
const tourModel = require("../models/tour.model");

class DashboardController {
  //[GET] /admin/dashboard
  async show(req, res, next) {
    try {
      const totalCustomers = await this.getTotalCustomers();
      const totalBookings = await this.getTotalBookings();
      const totalRatings = await this.getTotalRatings();
      const totalRevenue = await this.calculateTotalRevenue();
      const topBookingTours = await this.getToursByBookingCount();
      const topRevenueTours = await this.getToursByBookingTotalPrice();

      res.render("pages/admin/dashboard/index", {
        pageTitle: "Bảng điều khiển",
        style: "/pages/admin/dashboard.css",
        script: "/pages/admin/dashboard.js",
        totalCustomers: totalCustomers.toLocaleString("de-DE"),
        totalBookings: totalBookings.toLocaleString("de-DE"),
        totalRatings: totalRatings.toLocaleString("de-DE"),
        totalRevenue: totalRevenue.toLocaleString("de-DE"),
        top5BookingTours: topBookingTours.splice(0, 5),
        top5RevenueTours: topRevenueTours.splice(0, 5),
        layout: "main",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/dashboard/createStatistical
  async createStatistical(req, res, next) {
    try {
      const revenueResult = await paymentModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_at" },
              year: { $year: "$created_at" },
            },
            totalRevenue: { $sum: "$payment_total_price" },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalRevenue: 1,
          },
        },
      ]);

      const bookingResult = await bookingModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_at" },
              year: { $year: "$created_at" },
            },
            totalBooking: { $sum: "$booking_amount" },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalBooking: 1,
          },
        },
      ]);

      const cancelBookingPerMonthYear = await bookingModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_at" },
              year: { $year: "$created_at" },
            },
            totalCancelBooking: {
              $sum: {
                $cond: { if: { $eq: ["$booking_status", false] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalCancelBooking: 1,
          },
        },
      ]);

      const successBookingPerMonthYear = await bookingModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_at" },
              year: { $year: "$created_at" },
            },
            totalSuccessBooking: {
              $sum: {
                $cond: { if: { $eq: ["$booking_status", true] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalSuccessBooking: 1,
          },
        },
      ]);

      const totalBookings = await this.getTotalBookings();
      res.status(200).json({
        revenuePerMonthYear: revenueResult,
        bookingPerMonthYear: bookingResult,
        cancelBookingPerMonthYear,
        successBookingPerMonthYear,
        totalBookings,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getTotalCustomers() {
    try {
      const count = await userModel.countDocuments({ user_role: "customer" });
      return count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async getTotalRatings() {
    try {
      const count = await ratingModel.countDocuments();
      return count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async getTotalBookings() {
    try {
      const count = await bookingModel.countDocuments();
      return count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async calculateTotalRevenue() {
    try {
      const totalRevenue = await paymentModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$payment_total_price" },
          },
        },
      ]);

      const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
      return revenue;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async getToursByBookingCount() {
    try {
      const tours = await bookingModel.aggregate([
        {
          $group: {
            _id: "$tour", // Group by tour
            bookingCount: { $sum: "$booking_amount" } // Count the number of bookings
          }
        },
        {
          $sort: { bookingCount: -1 } // Sort by bookingCount in descending order
        },
        {
          $lookup: {
            from: "tours", // Assuming your tour collection name is 'tours'
            localField: "_id",
            foreignField: "_id",
            as: "tourDetails"
          }
        },
        {
          $unwind: "$tourDetails" // Unwind the tourDetails array to get the tour objects
        },
        {
          $project: {
            _id: 0,
            tour: "$tourDetails",
            bookingCount: 1
          }
        }
      ]);

      return tours;
    } catch (err) {
      console.error(err);
    }
  }

  async getToursByBookingTotalPrice() {
    try {
      const tours = await bookingModel.aggregate([
        {
          $group: {
            _id: "$tour", // Group by tour
            bookingRevenue: { $sum: "$booking_total_price" } // Count the number of bookings
          }
        },
        {
          $sort: { bookingRevenue: -1 } // Sort by bookingCount in descending order
        },
        {
          $lookup: {
            from: "tours", // Assuming your tour collection name is 'tours'
            localField: "_id",
            foreignField: "_id",
            as: "tourDetails"
          }
        },
        {
          $unwind: "$tourDetails" // Unwind the tourDetails array to get the tour objects
        },
        {
          $project: {
            _id: 0,
            tour: "$tourDetails",
            bookingRevenue: 1
          }
        }
      ]);

      return tours;
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = new DashboardController();
