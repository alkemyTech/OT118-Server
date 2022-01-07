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

const remove = async (id) => {
  const user = await usersRepository.getById(id)
  if (!user){
    const error = new Error(`User doesn't exist`)
    error.status = 404
    throw error
  }
  return await usersRepository.remove(id)
}

const getProfile = async (id) => {
  return await usersRepository.getById(id);
};

const getById = async(id) =>{
  const dataUser = await usersRepository.getById(id)
  return dataUser
}

module.exports = {
  create,
  login,
  getProfile,
  getById,
  remove,
  getAll,  
};
