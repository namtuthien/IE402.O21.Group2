const express = require("express");
const router = express.Router();

const SiteController = require("../../app/controllers/site.controller");

router.get("/", SiteController.index);

module.exports = router;
