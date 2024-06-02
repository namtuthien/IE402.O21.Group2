const express = require("express");
const router = express.Router();

const LineController = require("../../app/controllers/line.controller");

router.get("/getLineById", LineController.getLineById);

module.exports = router;
