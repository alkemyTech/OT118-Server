const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const organizationRepository = require('../repositories/organizations');
const bcrypt = require("bcryptjs");
const { generateToken } = require("../modules/auth");
const { paginate } = require("../modules/pagination");
const send = require('../modules/emailSender');
const createWecolmeEmailTemplate = require('../modules/welcomeEmailTemplate');
const config = require('../config/config');

const invalidUserMsg = "email or password is invalid.";
const pageLimit = 10;

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard");
  user.roleId = role.id;
  const data = await usersRepository.create(user);
  if (!data) {
    const error = new Error();
    error.status = 400;
    throw error;
  }

  const dataOrg = await organizationRepository.getById(config.organizationId);
  const template = createWecolmeEmailTemplate(dataOrg);
  await send(data.email, template, "¡Bienvenido!");

  return generateToken({ id: data.id });
}

const login = async (body) => {
  const user = await usersRepository.findByEmail(body.email);
  if (!user) throw new Error(invalidUserMsg);
  if (!bcrypt.compareSync(body.password, user.password)) throw new Error(invalidUserMsg);
  return generateToken({id: user.id});
}

const getAll = async ({baseUrl, page}) => {
    const count = await usersRepository.count();
    const paginatedResult = await paginate(baseUrl,page, pageLimit, count);
    if (count > 0) {
        paginatedResult.data = await usersRepository.getAll(pageLimit, paginatedResult.offset);
    }
    delete paginatedResult.offset;
    return paginatedResult;
};

const getProfile = async (id) => {
  return await usersRepository.getById(id);
};

const getById = async(id) =>{
  const dataUser = await usersRepository.getById(id)
  return dataUser
}

const update = async (id, body) => {
  const userExists = await usersRepository.getById(id);
  console.log(userExists);
  if (userExists) {
    body.password = bcrypt.hashSync(body.password, 10);
    await usersRepository.update(id, body);
    const userUpdated = await usersRepository.getById(id);
    return userUpdated
  }  else {
    const error = new Error('User not found.');
      error.status = 404;
      throw error;
  }
};

module.exports = {
  create,
  login,
  getAll,  
  getProfile,
  getById,
  update
}

