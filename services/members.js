const membersRepository = require("../repositories/members");
const { paginate } = require("../modules/pagination");
const pageLimit = 10;

const getAll = async ({ baseUrl, page }) => {
  const count = await membersRepository.count();
  const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
  if (count > 0) {
    paginatedResult.data = await membersRepository.getAll(
      pageLimit,
      paginatedResult.offset
    );
  }
  delete paginatedResult.offset;
  return paginatedResult;
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
