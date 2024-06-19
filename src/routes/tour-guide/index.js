const express = require("express");
const router = express.Router();
const TourGuideController = require("../../app/controllers/tour-guide.controller");
router.get("/get-customers", TourGuideController.getAllCustomers);



// [POST] /tour-log/store
router.post("/tour-log/store", TourGuideController.storeTourLog);

// [GET] /
router.get("/", TourGuideController.showTourGuide);
module.exports = router;
