const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");
const userRouter = require("./user.route")

router.use("/map", mapRouter);
router.use("/staff", userRouter);

module.exports = router;
