const Route = require("../models/route.model");
const Line = require("../models/line.model");
const Tour = require("../models/tour.model");
class RouteController {
  // [GET] /api/route/getTourRoutes
  async getRouteById(req, res, next) {
    try {
      const tours = await Tour.find();
      let tourRoutes = [];

      for (var i = 0; i < tours.length; i++) {
        let routeLines = [];
        let routes = [];
        let route;
        let line;
        for (var j = 0; j < tours[i].routes.length; j++) {
          let isExist = false;
          routes.forEach((item) => {
            if (item._id.toString() === tours[i].routes[j].route.toString()) {
              console.log(item._id.toString());
              isExist = true;
            }
          });
          if (!isExist) {
            route = await Route.findById(tours[i].routes[j].route);
            line = await Line.findById(route?.lines[0]);
            routes.push(route._id);
            line.points.forEach((point) => {
              routeLines.push([point.longitude, point.latitude]);
            });
          }
        }

        tourRoutes.push({ lines: routeLines, tour: tours[i] });
      }
      res.status(200).json({ tourRoutes: tourRoutes, tours });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new RouteController();
