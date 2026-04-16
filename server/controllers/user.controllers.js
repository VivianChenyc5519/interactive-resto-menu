const userService = require('../services/user.services');
const codes = require('../utils/responseCodes');

exports.authenticateUser = async (req, res, next) => {
    try {
        const data = req.body;
        const username = data.username;
        const password = data.pwd;
        const userID = await userService.authenticateUser(username, password);
        req.session.userId = userID;
        res.status(codes.OK).json({ message: "Successful Login" })
    } catch (err) {
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await userService.getProfile(req.session.userId);
        res.status(codes.OK).json(profile);
    } catch (err) {
        next(err);
    }
}