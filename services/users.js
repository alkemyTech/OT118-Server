
const usersRepository = require('../repositories/users')

const getById = async(id) =>{
  const dataUser = await usersRepository.getById(id)
  return dataUser
}

module.exports = {
  getById
}
