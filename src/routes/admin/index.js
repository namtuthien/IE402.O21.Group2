const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const dashboardRouter = require("./dashboard.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route")

router.use("/staff", userRouter);
router.use("/map", mapRouter);
router.use("/dashboard", dashboardRouter);
router.use("/", adminRouter);
module.exports = router;
