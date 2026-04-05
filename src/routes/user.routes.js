const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/user.controllers')

userRouter.post('/authenticate', userController.authenticateUser);

module.exports = userRouter;