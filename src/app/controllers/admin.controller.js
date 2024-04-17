class Admin {
  // [GET] /admin/map
  show(req, res, next) {
    res.render("./pages/admin/map/index", {
      pageTitle: "Location",
      style: "/pages/admin/toursMap.css",
      script: "/pages/admin/location.js",
      layout: "main",
    });
  }
}

module.exports = new Admin();
