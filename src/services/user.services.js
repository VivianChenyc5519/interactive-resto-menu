const userRepository = require("../repositories/user.repositories");
const codes = require("../utils/responseCodes")

exports.authenticateUser = async (username, pwd) => {
    if (!username || !pwd) {
        const err = new Error("Username and password are required");
        err.status = codes.BAD_REQUEST;
        throw err;
    }

    const user = await userRepository.getByName(username);
    if (!user || pwd !== user.pwd) {
        const err = new Error("Invalid credentials");
        err.status = codes.UNAUTHORIZED;
        throw err;
    }
    return {
        status: codes.OK
    }
}