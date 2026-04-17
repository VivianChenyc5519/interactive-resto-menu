const express = require("express");
const languageRouter = express.Router();
const languageController = require("../controllers/language.controllers");

languageRouter.get("/", languageController.toggleLanguage);

module.exports = languageRouter;