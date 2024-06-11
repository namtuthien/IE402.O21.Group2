// import models
const Location = require("../models/location.model");

class LocationController {
  // [GET] /api/location/getLocations
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
}

module.exports = new LocationController();


{
  activity_name:"test"
  activity_time:"10/06/2024"
  activity_desc:"test"
}