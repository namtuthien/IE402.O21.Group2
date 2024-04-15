const express = require("express");
const router = express.Router();

const tourRouter = require("./tour.route");
const mapRouter = require("./map.route");

router.use("/tour", tourRouter);
router.use("/map", mapRouter);

module.exports = router;
