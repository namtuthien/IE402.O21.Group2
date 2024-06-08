const express = require('express');

const router = express.Router();

const userController = require("../../app/controllers/user.controller")

router.delete('/deleteStaff/:id', userController.deleteUser)
router.get('/addstaff', userController.showAddStaffForm.bind(userController))
module.exports = router;