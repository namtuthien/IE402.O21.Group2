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
}

module.exports = new LineController();
