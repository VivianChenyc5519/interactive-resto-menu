const menuService = require('../services/menu.services');

exports.displayByCategoryFR = async (req, res, next) => {
    try {
        const category = req.params.category;
        const menu = await menuService.findByCategoryFR(category);
        res.render('menu', {items: menu});
    } catch (err) {
        next(err);
    }
}

exports.displayByCategoryEN = async (req, res, next) => {
    try {
        const category = req.params.category;
        const menu = await menuService.findByCategoryEN(category);
        res.render('menu', {items: menu});
    } catch (err) {
        next(err);
    }
}

exports.displayAllFR = async (req, res, next) => {
    try {
        const allMenus = await menuService.findAllFR();
        res.json(allMenus);
    } catch (err) {
        next(err);
    }
}

exports.displayAllEN = async (req, res, next) => {
    try {
        const allMenus = await menuService.findAllEN();
        res.json(allMenus);
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
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.getDishEN = async (req, res, next) => {
    try {
        const response = await menuService.getDishEN(req.params.name);
        res.json(response);
    } catch (err) {
        next(err);
    }
}