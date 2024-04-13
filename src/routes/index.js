const tourRouter = require("./tour.route");

const authRouter = require('./auth.route');

const siteRouter = require("./site.route");

const route = (app) => {
  app.use("/tour", tourRouter);
  app.use("/auth", authRouter);
  app.use("/", siteRouter);
};

module.exports = route;
