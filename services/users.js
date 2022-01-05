const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../modules/auth");
const { paginate } = require("../modules/pagination");
const invalidUserMsg = "email or password is invalid.";
const pageLimit = 10;

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard");
  user.roleId = role.id;
  const newUser = await usersRepository.create(user);
  return generateToken({ id: newUser.id });
};

const login = async (body) => {
  const user = await usersRepository.findByEmail(body.email);
  if (!user) throw new Error(invalidUserMsg);
  if (!bcrypt.compareSync(body.password, user.password))
    throw new Error(invalidUserMsg);
  return generateToken({ id: user.id });
};

const getAll = async ({ baseUrl, page }) => {
  return await paginate(baseUrl, page, pageLimit, usersRepository);
};

const getProfile = async (id) => {
  return await usersRepository.getById(id);
};

const getById = async (id) => {
  const dataUser = await usersRepository.getById(id);
  return dataUser;
};

module.exports = {
  create,
  login,
  getAll,
  getProfile,
  getById,
};
