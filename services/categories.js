const createError = require('http-errors');
const categoriesRepository = require('../repositories/categories');

const imageUpload = require('../modules/fileUpload');
const { paginate } = require("../modules/pagination");
const pageLimit = 10;

const getAll = async ({baseUrl, page}) => {
  const count = await categoriesRepository.count();
  const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
  if (count > 0) {
      paginatedResult.data = await categoriesRepository.getAll(pageLimit, paginatedResult.offset);
  }
  delete paginatedResult.offset;
  return paginatedResult;
};

const getById = async (id) => {
  const categoryId = await categoriesRepository.getById(id);
  if (!categoryId) throw createError(404, "Category not found.")
  return categoryId;
};

const create = async (image, fields) => {
  const imageLink = await imageUpload.upload(image);
  const newCategory = {...fields, image: imageLink};
  return await categoriesRepository.create(newCategory);
};

const update = async (id, body) => {
  const categoryId = await categoriesRepository.getById(id);
  if (!categoryId) {
    throw createError(404, "Category not found.")
  } else {
    await categoriesRepository.update(id, body);
  }
  return await categoriesRepository.getById(id);
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
