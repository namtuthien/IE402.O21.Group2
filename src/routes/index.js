const tourRouter = require("./tour.route");

const authRouter = require('./auth.route');

const route = (app) => {
  app.use("/tour", tourRouter);
  app.use("/auth", authRouter);


const siteRouter = require("./site.route");

const route = (app) => {
  app.use("/tour", tourRouter);
  app.use("/", siteRouter);

};

module.exports = route;
