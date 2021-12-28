const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../modules/auth");

const invalidUserMsg = "email or password is invalid.";

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard");
  user.roleId = role.id;
  const newUser = await usersRepository.create(user);
  return generateToken({id: newUser.id})
};

const login = async (body) => {
    const user = await usersRepository.findByEmail(body.email);
    if (!user) throw new Error(invalidUserMsg);
    if (!bcrypt.compareSync(body.password, user.password)) throw new Error(invalidUserMsg);
    return generateToken({id: user.id});
};

module.exports = {
  create,
  login,
};
