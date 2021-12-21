const categoriesRepository = require('../repositories/categories');

// Create category 
const create = async (body) => {
  return await categoriesRepository.create(body);
};

// Delete category 
const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  create,
  remove
};
