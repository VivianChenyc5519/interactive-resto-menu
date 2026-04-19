const userRepository = require("../repositories/user.repositories");
const codes = require("../utils/responseCodes");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt");

exports.authenticateUser = async (username, pwd) => {
    if (!username || !pwd) {
        const err = new Error("Username and password are required");
        err.status = codes.BAD_REQUEST;
        throw err;
    }

    const user = await userRepository.getByName(username);
    if (!user) {
        const err = new Error("Invalid credentials");
        err.status = codes.UNAUTHORIZED;
        throw err;
    }
    const PasswordMatch = await bcrypt.compare(pwd, user.pwd);
    if (!PasswordMatch) {
        const err = new Error("Invalid credentials");
        err.status = codes.UNAUTHORIZED;
        throw err;
    }
    return user.id;
}

exports.getProfile = async (userID) => {
    console.log(userID);
    if (!userID) {
        const err = new Error("User ID does not exist !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    if (typeof (userID) !== "number") {
        const err = new Error("User ID should be a number !");
        err.status = codes.BAD_REQUEST;
        throw err;
    }
    const profile = await userRepository.getByID(userID);
    return {
        status: codes.OK,
        id: profile.id,
        name: profile.name,
        role: profile.role,
        credit: profile.credit,
        favorites: profile.favorites
    }
}

exports.authenticate = async (req, res, next) => {
    const cookie = req.cookies['auth'];

    if(cookie == null) return res.render('/user/');

    req.session.userId = parseInt(cookie);

    next();
}