const membersRepository = require("../repositories/members");

const getAll = async () => {
  return await membersRepository.getAll();
};

const create = async (member) => {
  return await membersRepository.create(member);
};

const update = async (id, data) => {
  const member = await membersRepository.getById(id);
  if (!member) {
    throw new Error("Member not found");
  }
  await membersRepository.update(id, data);
  return await membersRepository.getById(id);
};

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
