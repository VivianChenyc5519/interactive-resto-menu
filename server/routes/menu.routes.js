const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controllers/menu.controllers");
const requireAuth = require("../middleware/requireAuth");

// menuRouter.use(requireAuth);
menuRouter.get('/fr/category/:category', menuController.displayByCategoryFR);
menuRouter.get('/en/category/:category', menuController.displayByCategoryEN);
menuRouter.get('/fr/all', menuController.displayAllFR);
menuRouter.get('/en/all', menuController.displayAllEN);
menuRouter.delete('/fr/delete', menuController.deleteMenuFR);
menuRouter.delete('/en/delete', menuController.deleteMenuEN);
menuRouter.post('/fr/add', menuController.addMenuFR);
menuRouter.post('/en/add', menuController.addMenuEN);
menuRouter.get('/fr/name/:name', menuController.getDishFR);
menuRouter.get('/en/name/:name', menuController.getDishEN);
menuRouter.get('/en/cart', menuController.getCart);

menuRouter.post("/en/cart/delete/:name", menuController.deleteCart);

menuRouter.post("/en/cart_add/:name", menuController.addCart);

module.exports = menuRouter;