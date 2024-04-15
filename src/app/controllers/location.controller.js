// import models
const Location = require("../models/location.model");

class LocationController {
  // [GET] /admin/map
  show(req, res, next) {
    res.render("./pages/admin/location/index", {
      pageTitle: "Location",
      style: "/pages/admin/test.css",
      script: "/pages/admin/location.js",
      layout: "main",
    });
  }

  async getLocations(req, res, next) {
    try {
      const locations = await Location.find();

      if (!locations) {
        return res.status(404).json({
          message: "Location not found",
        });
      }

      res.status(200).json({
        locations: locations,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new LocationController();
