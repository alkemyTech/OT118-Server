const usersRepository = require("../repositories/users");
const bcrypt = require("bcryptjs");

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  return await usersRepository.create(user);
};

module.exports = {
  create,
};
