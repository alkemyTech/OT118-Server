const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard")
  user.roleId = role.id;
  return await usersRepository.create(user);
};

module.exports = {
  create,
};
