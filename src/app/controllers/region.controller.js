// import models
const Region = require("../models/region.model");
const Polygon = require("../models/polygon.model");

class RegionController {
  // [GET] /api/region/getRegions
  async getRegions(req, res, next) {
    try {
      const regions = await Region.find().populate({
        path: "polygons",
        select: "points",
      });

      if (!regions) {
        return res.status(404).json({
          message: "Region not found",
        });
      }

      res.status(200).json({
        regions: regions,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new RegionController();
