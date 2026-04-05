const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controllers/menu.controllers");

menuRouter.get('/fr/category/:category', menuController.displayByCategoryFR);
menuRouter.get('/en/category/:category', menuController.displayByCategoryEN);
menuRouter.get('/fr/all', menuController.displayAllFR);
menuRouter.get('/en/all', menuController.displayAllEN);
menuRouter.delete('/fr/delete', menuController.deleteMenuFR);
menuRouter.delete('/en/delete', menuController.deleteMenuEN);

module.exports = menuRouter;