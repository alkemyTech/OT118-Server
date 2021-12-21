const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard")
  user.roleId = role.id;
  return await usersRepository.create(user);
};

const invalidUserMsg = "email or password is invalid.";

const login = async (body) => {
    const user = await usersRepository.findByEmail(body.email);
    if (!user) throw new Error(invalidUserMsg);
    if (!bcrypt.compareSync(body.password, user.password)) throw new Error(invalidUserMsg);
    return user;
};

module.exports = {
  create,
  login,
};
