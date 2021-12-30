
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 14017526f0cc4c6801c00e2a61aed511c31b78f0
const remove = async (id) => {
  const user = await usersRepository.getById(id)
  if (!user){
    const error = new Error(`User doesn't exist`)
    error.status = 404
    throw error
  }
  return await usersRepository.remove(id)
}

<<<<<<< HEAD
module.exports = {
  create,
  login,
  remove,
=======
const getProfile = async (id) => {
  return await usersRepository.getById(id);
};

const getById = async(id) =>{
  const dataUser = await usersRepository.getById(id)
  return dataUser
=======
const getProfile = async (id) => {
  return await usersRepository.getById(id);
>>>>>>> 14017526f0cc4c6801c00e2a61aed511c31b78f0
}



module.exports = {
  create,
  login,
<<<<<<< HEAD
  getProfile,
  getById,
>>>>>>> dev
=======
  remove,
  getProfile,
>>>>>>> 14017526f0cc4c6801c00e2a61aed511c31b78f0
};
