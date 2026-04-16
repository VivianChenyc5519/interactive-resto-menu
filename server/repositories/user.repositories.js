const fs = require("fs/promises");
const path = require("path");
const codes = require("../utils/responseCodes")

const filePath = path.join(__dirname, "../data/users.json");

async function readUsers() {
    try {
        const data = await fs.readFile(filePath, "utf8");
        const users = JSON.parse(data);
        return users;
    } catch (err) {
        err.status = codes.INTERNAL_SERVER_ERROR;
        throw err;
    }

}

exports.getByName = async (username) => {
    const users = await readUsers();
    return users.find(user => user.name === username);
}

exports.getByID = async(userID) => {
    const users = await readUsers();
    return users.find(user => user.id === userID);
}