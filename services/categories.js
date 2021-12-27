const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const listCategories = await categoriesRepository.getAll();
  return listCategories
};

const create = async (body) => {
  return await categoriesRepository.create(body);
};

const update = async (id, body) => {
  const categoryId = await categoriesRepository.getById(id);
  if (categoryId) {
    return await categoriesRepository.update(body);
  }
  else {
    const error = new Error('Category not found.');
      error.status = 404;
      throw error;
  }
};

const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  create,
  update,
  getAll,
  remove
};
