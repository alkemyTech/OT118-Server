const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const listCategories = await categoriesRepository.getAll();
  return listCategories
};

const create = async (body) => {
  return await categoriesRepository.create(body);
};

const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  create,
  getAll,
  remove
};
