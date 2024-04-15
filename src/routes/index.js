const adminRouter = require("./admin");
const apiRouter = require("./api");
const customerRouter = require("./customer");

const route = (app) => {
  app.use("/admin", adminRouter);
  app.use("/api", apiRouter);
  app.use("/", customerRouter);
};

module.exports = route;
