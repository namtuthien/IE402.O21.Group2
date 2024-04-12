const tourRouter = require("./tour.route");
const siteRouter = require("./site.route");

const route = (app) => {
  app.use("/tour", tourRouter);
  app.use("/", siteRouter);
};

module.exports = route;
