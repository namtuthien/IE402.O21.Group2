const express = require("express");
const router = express.Router();

const RouteController = require("../../app/controllers/route.controller");

router.get("/getTourRoutes", RouteController.getRouteById);
router.post("/add", RouteController.create);

module.exports = router;
