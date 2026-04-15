const userService = require('../services/user.services');

exports.authenticateUser = async (req, res, next) => {
    try {
        const data = req.body;
        const username = data.username;
        const password = data.pwd;
        const isAuthenticated = await userService.authenticateUser(username, password);
        res.json(isAuthenticated);
    } catch (err) {
        next(err);
    }

}