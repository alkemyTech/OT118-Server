const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const listCategories = await categoriesRepository.getAll();
  return listCategories
};

const getById = async (id) => {
  const categoryId = await categoriesRepository.getById(id);
  if (!categoryId) {
    const error = new Error('Category not found.');
      error.status = 404;
      throw error;
  }
  return categoryId;
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
  getById,
  remove
};
