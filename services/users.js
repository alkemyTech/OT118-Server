const usersRepository = require("../repositories/users");
const rolesRepository = require("../repositories/roles");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../modules/auth");
const send = require('../modules/emailSender');
const createWecolmeEmailTemplate = require('../modules/welcomeEmailTemplate');

const invalidUserMsg = "email or password is invalid.";

const create = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  let role = await rolesRepository.findByName("Standard")
  user.roleId = role.id;

  const data =  await usersRepository.create(user);
  if(data) {
    const template = await createWecolmeEmailTemplate(1)
    await send(data.email, template, '¡Bienvenido!')
  }

  return data;
}

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
