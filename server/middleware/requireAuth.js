const codes = require("../utils/responseCodes");

function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        console.log(req.session);
        console.log(req.session.userId);
        return res.status(codes.UNAUTHORIZED).json({error: "Authentication required"});
    }
    next();
}

module.exports = requireAuth;