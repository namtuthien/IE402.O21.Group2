const authRouter = require("./auth");
const adminRouter = require("./admin");
const customerRouter = require("./customer");

const route = (app) => {
  app.use("/admin", adminRouter);
  app.use("/", authRouter);
  app.use("/", customerRouter);
};

module.exports = route;
