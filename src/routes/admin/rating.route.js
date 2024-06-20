const express = require("express");
const router = express.Router();

const RatingController = require("../../app/controllers/rating.controller");

router.get("/", RatingController.showRatings);

module.exports = router;
