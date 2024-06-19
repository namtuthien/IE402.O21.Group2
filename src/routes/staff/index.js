const express = require("express");
const router = express.Router();
const StaffController = require("../../app/controllers/staff.controller");
const RatingController = require("../../app/controllers/rating.controller");

// [GET] one customer
router.get("/customer/:user_id", StaffController.getCustomerById);
router.get("/customers", StaffController.getCustomers);
router.get("/tours", StaffController.showTours);

// [GET] get map
router.get("/tourguides/location/show", StaffController.showRealTimeLocation) 

// [GET] all ratings
router.get("/rating/get-all", RatingController.index);

module.exports = router;
