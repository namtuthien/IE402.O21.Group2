// import models
const Location = require("../models/location.model");
const Polygon = require("../models/polygon.model");

class LocationController {
  // [GET] /admin/locations
  async showLocations(req, res, next) {
    try {
      const locations = await Location.find();
      if (!locations) {
        return res.status(404).json({
          message: "Location not found!",
        });
      }
      var newLocations = [];
      locations.forEach((tour) => {
        newLocations.push(tour.toObject());
      });
      return res.status(200).render("pages/admin/locations/index", {
        pageTitle: "Danh sách tour",
        style: "/pages/admin/locations.css",
        script: "/pages/admin/locations.js",
        locations: newLocations,
        mapLink: "/admin/map/locations",
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // [GET] /admin/map/locations
  async showLocationsMap(req, res, next) {
    const locations = await Location.find();
    if (!locations) {
      return res.status(404).json({
        message: "Location not found!",
      });
    }
    var newLocations = [];
    locations.forEach((tour) => {
      newLocations.push(tour.toObject());
    });
    res.render("./pages/admin/map/locations", {
      pageTitle: "Location",
      style: "/pages/admin/locations-map.css",
      script: "/pages/admin/locations-map.js",
      locations: newLocations,
      layout: "map",
    });
  }

  // [GET] /api/location/getLocations
  async getLocations(req, res, next) {
    try {
      const locations = await Location.find().populate({
        path: "boundary",
        select: "points",
      });

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

  // [POST] /location/store
  async store(req, res, next) {
    try {
      const data = { ...req.body };

      const location_coordinate = {
        longitude: data.location_coordinate_longitude,
        latitude: data.location_coordinate_latitude,
      };
      const activities = data.activity_no.map((stt, index) => ({
        activity_name: data.activity_name[index],
        activity_time: data.activity_time[index],
        activity_desc: data.activity_desc[index],
      }));
      const newLocation = new Location({
        location_name: data.location_name,
        location_address: data.location_address,
        location_coordinate: location_coordinate,
        location_type: data.location_type,
        location_phone_number: data.location_phone_number,
        location_website: data.location_website,
        location_description: data.location_description,
        activities,
      });
      await newLocation.save();
      res.status(201).json({ success: "Location store successfully!" });
    } catch (error) {
      res.status(500).json({ failed: "Location store failed!", error });
    }
  }

  // [POST] /api/location/updateLocation
  async updateLocation(req, res, next) {
    try {
      const location = req.body.location;

      await Location.findByIdAndUpdate(location._id, location);

      res.status(200).json({ success: "Location update successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // [DELETE] /api/location/deleteLocation
  async deleteLocation(req, res, next) {
    try {
      const locationId = req.body._id;

      await Location.findByIdAndDelete(locationId);

      res.status(200).json({ success: "Location update successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new LocationController();
