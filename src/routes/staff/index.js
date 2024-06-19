const express = require("express");
const router = express.Router();
const StaffController = require("../../app/controllers/staff.controller");
const RatingController = require("../../app/controllers/rating.controller");

// [GET] one customer
router.get("/customer/:user_id", StaffController.getCustomerById);

// [GET] get map
router.get("/tourguides/location/show", StaffController.showRealTimeLocation) 

// [GET] all ratings
router.get("/rating/get-all", RatingController.index);

module.exports = router;
