const Line = require("../models/line.model");

class LineController {
  // [GET] /admin/map
  async getLineById(req, res, next) {
    try {
      const line = Line.findById(req.body);
      console.log(req.body);

      if (!locations) {
        return res.status(404).json({
          message: "Line not found",
        });
      }

      res.status(200).json({
        line: line,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async create(req, res, next) {
    try {
      const points = req.body.points.map((point) => ({
        longitude: point.longitude,
        latitude: point.latitude,
      }));
  
      const linedb = { points };
  
      const data = await Line.create(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.error("Lỗi:", err);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }  
}

module.exports = new LineController();
