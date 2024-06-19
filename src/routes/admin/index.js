const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const dashboardRouter = require("./dashboard.route");
const staffRouter = require("./staff.route");
const customerRouter = require("./customer.route");
const locationRouter = require("./location.route");
const tourRouter = require("./tour.route");
const ratingRouter = require("./rating.route");

router.use("/map", mapRouter);
router.use("/dashboard", dashboardRouter);
router.use("/locations", locationRouter);
router.use("/staffs", staffRouter);
router.use("/customers", customerRouter);
router.use("/tours", tourRouter);
router.use("/ratings", ratingRouter);

module.exports = router;
