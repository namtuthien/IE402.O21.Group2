const express = require("express");
const router = express.Router();

const RatingController = require("../../app/controllers/rating.controller");
const { checkToken } = require("../../app/middlewares/auth.middleware");

router.get("/getTourRating", checkToken, RatingController.getTourRating);
router.get("/ratings", checkToken, RatingController.index);

module.exports = router;
