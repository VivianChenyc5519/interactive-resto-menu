const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controllers/menu.controllers");
const requireAuth = require("../middleware/requireAuth");
const userService = require("../services/user.services")

menuRouter.use(requireAuth);
menuRouter.get('/fr/category/:category', userService.authenticate, menuController.displayByCategoryFR);
menuRouter.get('/en/category/:category', userService.authenticate, menuController.displayByCategoryEN);
menuRouter.get('/fr/all', userService.authenticate, menuController.displayAllFR);
menuRouter.get('/en/all', userService.authenticate, menuController.displayAllEN);
menuRouter.delete('/fr/delete', menuController.deleteMenuFR);
menuRouter.delete('/en/delete', menuController.deleteMenuEN);
menuRouter.post('/fr/add', menuController.addMenuFR);
menuRouter.post('/en/add', menuController.addMenuEN);
menuRouter.get('/fr/name/:name', userService.authenticate, menuController.getDishFR);
menuRouter.get('/en/name/:name', userService.authenticate, menuController.getDishEN);
menuRouter.get('/en/cart', userService.authenticate, menuController.getCartEN);
menuRouter.get('/fr/cart', userService.authenticate, menuController.getCartFR);

menuRouter.post("/en/cart/delete/:name", menuController.deleteCartEN);
menuRouter.post("/en/cart_add/:name", menuController.addCartEN);

menuRouter.post("/fr/cart/delete/:name", menuController.deleteCartFR);
menuRouter.post("/fr/cart_add/:name", menuController.addCartFR);

module.exports = menuRouter;