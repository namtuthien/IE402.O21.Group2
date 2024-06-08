class SiteController {
  // [GET] /
  index(req, res, next) {
    res.render("./pages/default/index", {
      pageTitle: "",
      style: "/pages/default/index.css",
      script: "/pages/default/index.js",
      layout: "customer",
    });
  }

  // [GET] /login
  showLoginForm(req, res, next) {
    res.render("./pages/auth/login", {
      pageTitle: "Đăng nhập",
      style: "/pages/auth/login.css",
      script: "/pages/auth/login.js",
      layout: "customer",
    });
  }
  // [GET] /tours
  // showTours(req, res, next) {
  //   res.render("./pages/user/tours", {
  //     pageTitle: "Danh sách tour du lịch",
  //     style: "/pages/user/tours.css",
  //     script: "/pages/user/tours.js",
  //   });
  // }
}

module.exports = new SiteController();
