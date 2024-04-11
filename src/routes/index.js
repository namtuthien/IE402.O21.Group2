const tourRouter = require("./tour.route");

const route = (app) => {
  app.use("/tour", tourRouter);
};

module.exports = route;
