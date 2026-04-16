const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/user.controllers');
const requireAuth = require("../middleware/requireAuth");

userRouter.get('/authenticate', userController.loginUser);
userRouter.post('/authenticate', userController.authenticateUser);
userRouter.get('/profile', requireAuth, userController.getProfile);

module.exports = userRouter;