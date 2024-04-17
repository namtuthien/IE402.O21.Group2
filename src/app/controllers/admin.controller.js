class Admin {
  // [GET] /admin/map
  show(req, res, next) {
    res.render("./pages/admin/map/index", {
      pageTitle: "Location",
      style: "/pages/admin/toursMap.css",
      script: "/pages/admin/map.js",
      layout: "map",
    });
  }
}

module.exports = new Admin();
