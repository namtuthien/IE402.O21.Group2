class SiteController {
  // [GET] /
  index = async (req, res) => {
    res.render("./pages/default/index", {
      pageTitle: "",
      style: "/pages/default/index.css",
      script: "/pages/default/index.js",
      layout: "customer",
    });
  };
}

module.exports = new SiteController();
