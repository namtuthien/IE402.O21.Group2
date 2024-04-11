const express = require("express");
const router = express.Router();

const tourController = require("../app/controllers/TourController");

router.get("/test", (req, res) => {
  res.render("./pages/admin/tour", {
    pageTitle: "Test",
    style: "/admin/test.css",
    script: "/admin/test.js",
  });
});

module.exports = router;
