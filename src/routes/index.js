const tourRouter = require("./tour");
function route(app) {
  app.use("/tour", tourRouter);
}

module.exports = route;
