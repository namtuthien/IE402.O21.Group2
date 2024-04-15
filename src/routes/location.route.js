const express = require("express");
const router = express.Router();

const locationController = require("../app/controllers/location.controller");

router.get("/getLocations", locationController.getLocations);
router.get("/", locationController.show);

module.exports = router;