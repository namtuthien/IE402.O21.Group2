const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const bookingModel = require("../models/booking.model");
const ratingModel = require("../models/rating.model");

class DashboardController {

    //[GET] /admin/dashboard
    async show(req, res, next) {
        const totalCustomers = await this.getTotalCustomers();
        const totalBookings = await this.getTotalBookings();
        const totalRatings = await this.getTotalRatings();
        const totalRevenue = await this.calculateTotalRevenue();
        const admin = await this.getAdminById(req.user_id)
        res.render('pages/admin/dashboard', {
            pageTitle: "Bảng điều khiển",
            style: "/pages/admin/dashboard.css",
            script: "/pages/admin/dashboard.js",
            totalCustomers: totalCustomers.toLocaleString("de-DE"),
            totalBookings: totalBookings.toLocaleString("de-DE"),
            totalRatings: totalRatings.toLocaleString("de-DE"),
            totalRevenue: totalRevenue.toLocaleString("de-DE"),
            user_name: admin.user_name,
            user_role: admin.user_role
            // layout: "main"
        });
    }

    // [GET] /admin/dashboard/createStatistical
    async createStatistical(req, res, next) {
        try {
            const revenueResult = await paymentModel.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: "$created_at" },
                            year: { $year: "$created_at" }
                        },
                        totalRevenue: { $sum: "$payment_total_price" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalRevenue: 1
                    }
                }
            ]);

            const bookingResult = await bookingModel.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: "$created_at" },
                            year: { $year: "$created_at" }
                        },
                        totalBooking: { $sum: "$booking_amount" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalBooking: 1
                    }
                }
            ]);

            const cancelBookingPerMonthYear = await bookingModel.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: "$created_at" },
                            year: { $year: "$created_at" }
                        },
                        totalCancelBooking: {
                            $sum: {
                                $cond: { if: { $eq: ["$booking_status", false] }, then: 1, else: 0 }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalCancelBooking: 1
                    }
                }
            ]);

            const successBookingPerMonthYear = await bookingModel.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: "$created_at" },
                            year: { $year: "$created_at" }
                        },
                        totalSuccessBooking: {
                            $sum: {
                                $cond: { if: { $eq: ["$booking_status", true] }, then: 1, else: 0 }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalSuccessBooking: 1
                    }
                }
            ]);

            const totalBookings = await this.getTotalBookings();

            res.status(200).json({
                revenuePerMonthYear: revenueResult,
                bookingPerMonthYear: bookingResult,
                cancelBookingPerMonthYear,
                successBookingPerMonthYear,
                totalBookings
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    async getTotalCustomers() {
        try {
            const count = await userModel.countDocuments({ user_role: 'customer' });
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
                        total: { $sum: "$payment_total_price" }
                    }
                }
            ]);

            const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
            return revenue;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    async getAdminById(id) {
        try {
            const admin = await userModel.findById(id);
            return admin;
        }
        catch (err) {
            console.error(err);
            return 0;
        }
    }
}

module.exports = new DashboardController();