const express = require('express');

const router = express.Router();

const userController = require("../../app/controllers/user.controller")

router.delete('/deleteStaff/:id', userController.deleteUser)

module.exports = router;