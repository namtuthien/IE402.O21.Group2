const express = require("express");
const router = express.Router();

const TourController = require("../../app/controllers/tour.controller");
const LocationController = require("../../app/controllers/location.controller");
const AdminController = require("../../app/controllers/admin.controller");
const StaffController = require("../../app/controllers/staff.controller");

router.get("/tours", TourController.showTours);
router.get("/locations", LocationController.showLocations);
router.get("/staffs", StaffController.showStaffs);
router.post('/tour/addtour', TourController.store)
router.patch('/tour/edit/:id', TourController.update);
router.delete('/tour/delete/:id', TourController.delete);
router.delete('/tour/destroy', TourController.destroy);
router.get("/staff/addstaff", AdminController.showAddStaffForm);
router.get("/staff/view/:id", AdminController.showEditStaffForm);

router.post("/staff/addStaff", AdminController.addStaff);

router.patch("/staff/update/:id", AdminController.updateStaffInfo);

router.delete("/staff/deleteStaff/:id", AdminController.deleteUser);

module.exports = router;
