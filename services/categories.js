const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const listCategories = await categoriesRepository.getAll();
  return listCategories
};

const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  getAll,
  remove
};
