const Route = require("../models/route.model");
const Line = require("../models/line.model");
class RouteController {
  // [GET] /api/route/getRouteById
  // async getRouteById(req, res, next) {
  //   try {
  //     console.log(req.params._id);
  //     const routeId = req.params._id;
  //     const route = await Route.findOne({ _id: req.params._id });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({
  //       message: "Internal server error",
  //     });
  //   }
  // }
}

module.exports = new RouteController();
