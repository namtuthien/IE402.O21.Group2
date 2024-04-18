const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const bookingModel = require("../models/booking.model");

class DashboardController {
    async show(req, res, next) {
        const totalCustomers = await this.getTotalCustomers();
        const totalBookings = await this.getTotalBookings();
        const totalStaffs = await this.getTotalStaffs();
        const totalRevenue = await this.calculateTotalRevenue();
        res.render('pages/admin/dashboard', {
            pageTitle: "Bảng điều khiển",
            style: "/pages/admin/dashboard.css",
            script: "/pages/admin/dashboard.js",
            totalCustomers: totalCustomers,
            totalBookings: totalBookings,
            totalStaffs: totalStaffs,
            totalRevenue: totalRevenue,
            // layout: "main"
        });
    }
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

    async getTotalStaffs() {
        try {
            const count = await userModel.countDocuments({ user_role: 'staff' });
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
}

module.exports = new DashboardController();