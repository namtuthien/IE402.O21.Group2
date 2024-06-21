const express = require("express");
const router = express.Router();

const RegionController = require("../../app/controllers/region.controller");

router.get("/getRegions", RegionController.getRegions);

module.exports = router;
