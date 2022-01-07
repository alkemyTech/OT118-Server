const categoriesRepository = require('../repositories/categories');
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

const update = async (id, body) => {
  const categoryId = await categoriesRepository.getById(id);
  console.log(categoryId);
  if (categoryId) {
    return await categoriesRepository.update(id, body);
  }  else {
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
  getById,
  remove
};
