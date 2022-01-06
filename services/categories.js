const categoriesRepository = require('../repositories/categories');
const createError = require("http-errors");

const getAll = async () => {
  const listCategories = await categoriesRepository.getAll();
  return listCategories
};

const getById = async (id) => {
  const categoryId = await categoriesRepository.getById(id);
  if (!categoryId) throw createError(404, "Category not found.")
  return categoryId;
};

const create = async (body) => {
  return await categoriesRepository.create(body);
};

const update = async (id, body) => {
  const categoryId = await categoriesRepository.getById(id);
  console.log(categoryId);
  if (categoryId) {
    return await categoriesRepository.update(id, body);
  }  else {
    throw createError(404, "Category not found.")
  }
};

const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  remove
};
