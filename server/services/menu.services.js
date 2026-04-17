const menuRepository = require("../repositories/menu.repositories");
const codes = require("../utils/responseCodes")

exports.findByCategoryFR = async (category) => {
    category = category.toLowerCase();
    if (!category) {
        const err = new Error("Category is required");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    const menus = await menuRepository.findByCategoryFR(category);
    return {
        status: codes.OK,
        menus: menus
    }
}

exports.findByCategoryEN = async (category) => {
    category = category.toLowerCase();
    if (!category) {
        const err = new Error("Category is required");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    const menus = await menuRepository.findByCategoryEN(category);
    return {
        status: codes.OK,
        menus: menus
    }
}

exports.findAllEN = async () => {
    const allMenus = await menuRepository.findAllEN();
    return {
        status: codes.OK,
        menus: allMenus
    }
}

exports.findAllFR = async () => {
    const allMenus = await menuRepository.findAllFR();
    return {
        status: codes.OK,
        menus: allMenus
    }
}

exports.getCart = async () => {
    const cart = await menuRepository.getCartEN();
    return {
        status: codes.OK,
        cart: cart 
    }
}

exports.deleteMenuFR = async (name) => {
    const del = await menuRepository.deleteMenuFR(name);
    if (del) {
        return {
            status: codes.OK
        }
    } else {
        const err = new Error("Dish not found !");
        err.status = codes.NOT_FOUND;
        throw err;
    }
}

exports.deleteMenuEN = async (name) => {
    const del = await menuRepository.deleteMenuEN(name);
    if (del) {
        return {
            status: codes.OK
        }
    } else {
        const err = new Error("Dish not found !");
        err.status = codes.NOT_FOUND;
        throw err;
    }
}

exports.deleteCartEN = async (name) => {
    const del = await menuRepository.deleteCartEN(name);
    if (del) {
        return {
            status: codes.OK
        }
    } else {
        const err = new Error("Dish not found !");
        err.status = codes.NOT_FOUND;
        throw err;
    }
}

exports.addCartEN = async (name) => {
    const add = await menuRepository.addCartEN(name);
    if (add) {
        return {
            status: codes.OK
        }
    } else {
        const err = new Error("Dish not found !");
        err.status = codes.NOT_FOUND;
        throw err;
    }
}


exports.addMenuFR = async (data) => {
    const requireFields = await menuRepository.getFields();
    const missing = requireFields.filter(
        field => data[field] === undefined || data[field] === null
    );
    if (missing.length > 0) {
        const err = new Error(`Missing fields: ${missing.join(",")}`);
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    if (!Array.isArray(data.ingredients)) {
        const err = new Error("Ingredients must be an array !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    if (typeof data.price !== "number") {
        const err = new Error("Price must be a number");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    let success = await menuRepository.addMenuFR(data);
    if (!success) {
        const err = new Error("Item already exists in the menu !");
        err.status = codes.BAD_REQUEST;
        throw err;

    }
    return {
        status: codes.OK
    }
}

exports.addMenuEN = async (data) => {
    const requireFields = await menuRepository.getFields();
    const missing = requireFields.filter(
        field => data[field] === undefined || data[field] === null
    );
    if (missing.length > 0) {
        const err = new Error(`Missing fields: ${missing.join(",")}`);
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    if (!Array.isArray(data.ingredients)) {
        const err = new Error("Ingredients must be an array !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    if (typeof data.price !== "number") {
        const err = new Error("Price must be a number");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    let success = await menuRepository.addMenuEN(data);
    if (!success) {
        const err = new Error("Item already exists in the menu !");
        err.status = codes.BAD_REQUEST;
        throw err;

    }
    return {
        status: codes.OK
    }

}

exports.getDishFR = async (name) => {
    if (!name) {
        const err = new Error("Name cannot be empty !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    const dish = await menuRepository.getDishByNameFR(name);
    if (!dish) {
        const err = new Error(`Dish ${name} not found !`);
        err.status = codes.NOT_FOUND;
        throw err;
    }
    return {
        status: codes.OK,
        dish: dish
    }
}

exports.getDishEN = async (name) => {
    if (!name) {
        const err = new Error("Name cannot be empty !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    const dish = await menuRepository.getDishByNameEN(name);
    if (!dish) {
        const err = new Error(`Dish ${name} not found !`);
        err.status = codes.NOT_FOUND;
        throw err;
    }
    return {
        status: codes.OK,
        dish: dish
    }
}