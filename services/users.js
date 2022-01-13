const createError = require("http-errors");
const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const organizationRepository = require("../repositories/organizations");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../modules/auth");
const jwt = require("../modules/auth"); // prueba de emi
const { paginate } = require("../modules/pagination");
const { send } = require("../modules/emailSender");
const { createWecolmeEmailTemplate } = require("../modules/welcomeEmailTemplate");
const config = require("../config/config");

const invalidUserMsg = "email or password is invalid.";
const pageLimit = 10;

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard");
  user.roleId = role.id;
  const data = await usersRepository.create(user);
  if (!data) throw createError(400);

  // const dataOrg = await organizationRepository.getById(config.organizationId);
  // const template = await createWecolmeEmailTemplate(dataOrg);
  // await send(data.email, template, "¡Bienvenido!");

  return jwt.generateToken({ id: data.id });
};

const login = async (body) => {
  const user = await usersRepository.findByEmail(body.email);
  if (!user) throw createError(401, invalidUserMsg);
  if (!bcrypt.compareSync(body.password, user.password))
    throw createError(401, invalidUserMsg);
  return generateToken({ id: user.id });
};

const getAll = async ({ baseUrl, page }) => {
  const count = await usersRepository.count();
  const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
  if (count > 0) {
    paginatedResult.data = await usersRepository.getAll(
      pageLimit,
      paginatedResult.offset
    );
  }
  delete paginatedResult.offset;
  return paginatedResult;
};

const remove = async (id) => {
  const user = await usersRepository.getById(id);
  if (!user) throw createError(404, { msg: "User doesn't exist" });
  return await usersRepository.remove(id);
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

const update = async (id, body) => {
  const userExists = await usersRepository.getById(id);
  if (userExists) {
    body.password = bcrypt.hashSync(body.password, 10);
    await usersRepository.update(id, body);
    const userUpdated = await usersRepository.getById(id);
    return userUpdated;
  } else {
    throw createError(404, { msg: "User not found" });
  }
};

module.exports = {
  create,
  login,
  update,
  getProfile,
  getById,
  remove,
  getAll,
};
