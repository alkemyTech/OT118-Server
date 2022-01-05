
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
const getAll = async () => {
  const data = await usersRepository.getAll();
  return data;



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
};
