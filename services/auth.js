const bcrypt = require("bcryptjs");
const usersRepository = require("../repositories/users");

const login = async (body) => {
    const user = await usersRepository.findByEmail(body.email);
    if (user) {
        if(bcrypt.compareSync(body.password, user.password))
        {
           return user;
        }
    }
    return null;
};

module.exports = {
    login,
};
