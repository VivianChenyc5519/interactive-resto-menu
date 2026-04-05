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

exports.deleteMenuFR = async (name) => {
    await menuRepository.deleteMenuFR(name);
    return {
        status: codes.OK
    }
}

exports.deleteMenuEN = async (name) => {
    const del = await menuRepository.deleteMenuEN(name);
    if (del) {
        return {
            status: codes.OK
        }
    } else {
        return  {
            status: codes.NOT_FOUND
        }
    }

}