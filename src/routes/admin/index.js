const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const dashboardRouter = require("./dashboard.route");

router.use("/map", mapRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
