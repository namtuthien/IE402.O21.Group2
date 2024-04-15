const express = require("express");
const router = express.Router();

const loginRouter = require("./login.route");

router.use("/", loginRouter);

module.exports = router;
