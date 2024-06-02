const adminRouter = require("./admin");
const apiRouter = require("./api");
const customerRouter = require("./customer");
const TourGuideRouter = require("./tour-guide");
const route = (app) => {
  app.use("/admin", adminRouter);
  app.use("/tour-guide", TourGuideRouter);
  app.use("/api", apiRouter);
  app.use("/", customerRouter);
};

module.exports = route;
