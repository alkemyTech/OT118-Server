const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../modules/auth");
const createError = require("http-errors");
const invalidUserMsg = "email or password is invalid.";

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
  if (!bcrypt.compareSync(body.password, user.password)) throw new Error(invalidUserMsg);
  return generateToken({ id: user.id });
};

const getAll = async () => {
  const data = await usersRepository.getAll();
  return data;



};

const getProfile = async (id) => {
  const data = await usersRepository.getById(id);
  if (!data) throw createError(404, { msg: "User not found" });
  return data;
};

const getById = async (id) => {
  const data = await usersRepository.getById(id);
  if (!data) throw createError(404, { msg: "User not found" });
  return data;
};

module.exports = {
  create,
  login,
  getAll,
  getProfile,
  getById,
};
