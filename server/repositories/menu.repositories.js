const fs = require("fs/promises");
const path = require("path");
const codes = require("../utils/responseCodes");
const { write } = require("fs");

const filePathFR = path.join(__dirname, "../data/menu_FR.json");
const filePathEN = path.join(__dirname, "../data/menu_EN.json");

const cartPathEN = path.join(__dirname, "../data/cart_EN.json");

async function readCartEN() {
    try {
        const data = await fs.readFile(cartPathEN, "utf8");
        const menus = JSON.parse(data);
        return menus;
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}


async function readMenuFR() {
    try {
        const data = await fs.readFile(filePathFR, "utf8");
        const menus = JSON.parse(data);
        return menus;
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}
async function readMenuEN() {
    try {
        const data = await fs.readFile(filePathEN, "utf8");
        const menus = JSON.parse(data);
        return menus;
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}

async function writeMenuFR(menuJSON) {
    try {
        const menu = JSON.stringify(menuJSON);
        await fs.writeFile(filePathFR, menu);
        console.log("File written successfully");
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}

async function writeMenuEN(menuJSON) {
    try {
        const menu = JSON.stringify(menuJSON);
        await fs.writeFile(filePathEN, menu);
        console.log("File written successfully");
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}

async function writeCartEN(menuJSON) {
    try {
        const menu = JSON.stringify(menuJSON);
        await fs.writeFile(cartPathEN, menu);
        console.log("File written successfully");
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }
}

exports.getCartEN = async (category) => {
    const menus = await readCartEN();
    return menus;
}

exports.findByCategoryFR = async (category) => {
    const menus = await readMenuFR();
    return menus.filter(menu => menu.category.toLowerCase() === category.toLowerCase());
}

exports.findByCategoryEN = async (category) => {
    const menus = await readMenuEN();
    return menus.filter(menu => menu.category.toLowerCase() === category.toLowerCase());
}

exports.findAllEN = async () => {
    const allMenus = await readMenuEN();
    return allMenus;
}

exports.findAllFR = async () => {
    const allMenus = await readMenuFR();
    return allMenus;
}

exports.deleteMenuFR = async (name) => {
    const menus = await readMenuFR();
    const prevLength = menus.length;
    const updatedMenu = menus.filter(menu => menu.name.toLowerCase() !== name.toLowerCase());
    if (prevLength === updatedMenu.length) {
        console.log("Cannot find the item");
        return null;
    };
    await writeMenuFR(updatedMenu);
    return true;
}

exports.deleteCartEN = async (name) => {
    const menus = await readCartEN();
    const prevLength = menus.length;
    const updatedMenu = menus.filter(menu => menu.name.toLowerCase() !== name.toLowerCase());
    if (prevLength === updatedMenu.length) {
        console.log("Cannot find the item");
        return null;
    };
    await writeCartEN(updatedMenu);
    return true;
}

exports.deleteMenuEN = async (name) => {
    const menus = await readMenuEN();
    const prevLength = menus.length;
    const updatedMenu = menus.filter(menu => menu.name.toLowerCase() !== name.toLowerCase());
    if (prevLength === updatedMenu.length) {
        console.log("Cannot find the item");
        return null;
    };
    await writeMenuEN(updatedMenu);
    return true;
}

exports.getFields = async() => {
    const menus = await readMenuEN();
    if (!menus) {
        return [];
    }
    return Object.keys(menus[0]);
}

exports.getDishByNameFR = async(name) => {
    const menus = await readMenuFR();
    const dish = menus.find(menu => name.toLowerCase() === menu.name.toLowerCase());
    return dish;
}

exports.getDishByNameEN = async(name) => {
    const menus = await readMenuEN();
    const dish = menus.find(menu => name.toLowerCase() === menu.name.toLowerCase());
    return dish;
}

exports.addMenuFR = async(data) => {
    const menus = await readMenuFR();
    if (this.getDishByNameFR(data.name)) { // if the dish name already exists
        return false;
    } else {
        menus.push(data);
    await writeMenuFR(menus);
    return true;
    }
}

exports.addMenuEN = async(data) => {
    const menus = await readMenuEN();
    if (this.getDishByNameEN(data.name)) { // if the dish name already exists
        return false;
    } else {
        menus.push(data);
    await writeMenuEN(menus);
    return true;
    }
}

exports.addCartEN = async(data) => {
    const dish = await this.getDishByNameEN(data)
    if (dish) { // if the dish name already exists
        let cart = await readCartEN();
        cart.push(dish);
        await writeCartEN(cart);
        return true;
    } else {
        return false
    
    return true;
    }
}

