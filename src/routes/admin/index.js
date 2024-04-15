const express = require("express");
const router = express.Router();

const mapRouter = require("./map.route");

router.use("/map", mapRouter);

module.exports = router;
