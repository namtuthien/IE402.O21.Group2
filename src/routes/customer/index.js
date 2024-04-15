const express = require("express");
const router = express.Router();

const siteRouter = require("./site.route");

router.use("/", siteRouter);

module.exports = router;
