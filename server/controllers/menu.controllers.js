const menuService = require('../services/menu.services');

exports.displayByCategoryFR = async (req, res, next) => {
    try {
        const category = req.params.category;
        const menu = await menuService.findByCategoryFR(category);
        res.render('menu_fr', {items: menu.menus});
    } catch (err) {
        next(err);
    }
}

exports.displayByCategoryEN = async (req, res, next) => {
    try {
        const category = req.params.category;
        
        const menu = await menuService.findByCategoryEN(category);
        console.log(menu);
        res.render('menu', {items: menu.menus});
        // res.json(menu)
    } catch (err) {
        next(err);
    }
}

exports.displayAllFR = async (req, res, next) => {
    try {
        const allMenus = await menuService.findAllFR();
        res.render('menu_fr', {items: allMenus.menus});
    } catch (err) {
        next(err);
    }
}

exports.displayAllEN = async (req, res, next) => {
    try {
        const allMenus = await menuService.findAllEN();
        res.render('menu', {items: allMenus.menus});
    } catch (err) {
        next(err);
    }
}

exports.deleteMenuFR = async (req, res, next) => {
    try {
        const name = req.body.name;
        const response = await menuService.deleteMenuFR(name);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.deleteMenuEN = async (req, res, next) => {
    try {
        const name = req.body.name;
        const response = await menuService.deleteMenuEN(name);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.addMenuFR = async (req, res, next) => {
    try {
        const response = await menuService.addMenuFR(req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.addMenuEN = async (req, res, next) => {
    try {
        const response = await menuService.addMenuEN(req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.getDishFR = async (req, res, next) => {
    try {
        const response = await menuService.getDishFR(req.params.name);
        res.render("item_fr", {NAME: response.dish.name, INGREDIENTS:response.dish.ingredients, ALLERGENS:response.dish.allergens, CARBON:response.dish.footprint, IMAGE:response.dish.image  });
    } catch (err) {
        next(err);
    }
}

exports.getDishEN = async (req, res, next) => {
    try {
        const response = await menuService.getDishEN(req.params.name);
        res.render("item", {NAME: response.dish.name, INGREDIENTS:response.dish.ingredients, ALLERGENS:response.dish.allergens, CARBON:response.dish.footprint, IMAGE:response.dish.image  });
    } catch (err) {
        next(err);
    }
}

exports.getCart = async (req, res, next) => {
    try {
        const response = await menuService.getCart();
        console.log(response)
        res.render("cart", {items: response.cart});
    } catch (err) {
        next(err);
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const name = req.params.name;
        const response = await menuService.deleteCartEN(name);
        res.redirect('/menu/en/cart');
    } catch (err) {
        next(err);
    }
}

exports.addCart = async (req, res, next) => {
    try {
        const name = req.params.name;
        const response = await menuService.addCartEN(name);
        res.redirect('/menu/en/all');
    } catch (err) {
        next(err);
    }
}