const express = require("express");
const router = express.Router();

const siteRouter = require("./site.route");
const ratingRouter = require("./rating.route");

router.use("/", siteRouter);
router.use("/customer", ratingRouter);

module.exports = router;
