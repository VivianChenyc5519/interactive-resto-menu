const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/user.controllers');
const requireAuth = require("../middleware/requireAuth");
const userService = require("../services/user.services")
const bcrypt = require('bcryptjs');


userRouter.get('/', userController.loginUser);
userRouter.post('/authenticate', userController.authenticateUser);
userRouter.get('/profile/fr', userService.authenticate, userController.getProfileFr);
userRouter.get('/profile/en', userService.authenticate, userController.getProfileEn);

module.exports = userRouter;