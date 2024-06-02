const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const userRouter = require("./user.route")
const adminRouter = require("./admin.route");
router.use("/map", mapRouter);
router.use("/staff", userRouter);
router.use("/", adminRouter);
module.exports = router;
