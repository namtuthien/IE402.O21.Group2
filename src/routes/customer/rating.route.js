const express = require("express");
const router = express.Router();
const checkToken = require("../../app/middlewares/auth.middleware");

const RatingController = require("../../app/controllers/rating.controller");
router.post("/rating/store", RatingController.storeRating);
module.exports = router;