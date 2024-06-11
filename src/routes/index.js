const adminRouter = require("./admin");
const apiRouter = require("./api");
const customerRouter = require("./customer");
const TourGuideRouter = require("./tour-guide");
const StaffRouter = require("./staff");
const { checkToken } = require("../app/middlewares/auth.middleware");
const { forbiddenAction } = require("../app/middlewares/403.middleware");
const { notFoundAction } = require("../app/middlewares/404.middleware");
const route = (app) => {
  app.use("/admin", checkToken, forbiddenAction(["admin"]), adminRouter);
  app.use("/tour-guide", checkToken, forbiddenAction(["admin", "tourguide"]), TourGuideRouter);
  app.use("/staff", checkToken, forbiddenAction(["admin", "staff"]), StaffRouter);
  app.use("/api", apiRouter);
  app.use("/", customerRouter);
  app.use(notFoundAction);
};

module.exports = route;
