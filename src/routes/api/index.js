const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const locationRouter = require("./location.route");
const tourRouter = require("./tour.route");

router.use("/auth", authRouter);
router.use("/location", locationRouter);
router.use("/tour", tourRouter);

module.exports = router;
