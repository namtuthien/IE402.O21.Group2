const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const adminRouter = require("./admin.route");
router.use("/map", mapRouter);
router.use("/", adminRouter);
module.exports = router;
