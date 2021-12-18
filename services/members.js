const membersRepository = require("../repositories/members");

const getAll = async () => {
  return await membersRepository.getAll();
};

const create = async (member) => {
  return await membersRepository.create(member);
};

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  getAll,
  create,
  remove,
};
