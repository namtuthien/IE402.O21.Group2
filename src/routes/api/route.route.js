const express = require("express");
const router = express.Router();

const RouteController = require("../../app/controllers/route.controller");

router.get("/getTourRoutes", RouteController.getRouteById);

module.exports = router;
