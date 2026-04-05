const menuService = require('../services/menu.services');

exports.displayByCategoryFR = async (req, res, next) => {
    try {
        const category = req.params.category;
        const menu = await menuService.findByCategoryFR(category);
        res.json(menu);
    } catch (err) {
        next(err);
    }
}

exports.displayByCategoryEN = async (req, res, next) => {
    try {
        const category = req.params.category;
        const menu = await menuService.findByCategoryEN(category);
        res.json(menu);
    } catch (err) {
        next(err);
    }
}

exports.displayAllFR = async(req, res, next) => {
    try {
        const allMenus = await menuService.findAllFR();
        res.json(allMenus);
    } catch (err) {
        next(err);
    }
}

exports.displayAllEN = async(req, res, next) => {
    try {
        const allMenus = await menuService.findAllEN();
        res.json(allMenus);
    } catch (err) {
        next(err);
    }
}

exports.deleteMenuFR = async(req, res, next) => {
    try {
        const name = req.body.name;
        const response = await menuService.deleteMenuFR(name);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

exports.deleteMenuEN = async(req, res, next) => {
    try {
        const name = req.body.name;
        const response = await menuService.deleteMenuEN(name);
        res.json(response);
    } catch (err) {
        next(err);
    }
}