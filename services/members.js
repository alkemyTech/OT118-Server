const membersRepository = require("../repositories/members");

const getAll = async () => {
  return await membersRepository.getAll();
};

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  getAll,
  remove,
};
