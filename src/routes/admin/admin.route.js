const express = require("express");
const router = express.Router();
const TourController = require("../../app/controllers/tour.controller");
const AdminController = require("../../app/controllers/admin.controller");

router.get("/tours", TourController.showTours);

router.get("/user/view/:id", AdminController.getStaff);
router.post("/addStaff", AdminController.addStaff);
router.patch("/user/update/:id", AdminController.updateStaffInfo);

module.exports = router;
