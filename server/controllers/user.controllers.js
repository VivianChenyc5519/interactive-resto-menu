const userService = require('../services/user.services');
const codes = require('../utils/responseCodes');
var exphbs = require('express-handlebars');

exports.authenticateUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(req.body);
        const username = data.username;
        const password = data.pwd;
        const userID = await userService.authenticateUser(username, password);
        req.session.userId = userID;
        res.status(codes.OK).redirect('http://localhost:3000/menu/en/all')
    } catch (err) {
        next(err);
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const language = req.session.language === "french" ? "fr" : "en";
        const viewName = `login_${language}`;
        res.render(viewName, { layout: false });
    } catch (err) {
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await userService.getProfile(req.session.userId);
        res.status(codes.OK).json(profile)
        res.render('user_page', {profile: profile})
    } catch (err) {
        next(err);
    }
}