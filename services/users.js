const usersRepository = require("../repositories/users");
const bcrypt = require("bcryptjs");
const invalidUserMsg = "email or password is invalid.";

const login = async (body) => {
    const user = await usersRepository.findByEmail(body.email);
    if (!user) throw new Error(invalidUserMsg);
    if (!bcrypt.compareSync(body.password, user.password)) throw new Error(invalidUserMsg);
    return user;
};

module.exports = {
    login,
};
