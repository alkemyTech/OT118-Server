const categoriesRepository = require('../repositories/categories');

const remove = async (id) => {
  await categoriesRepository.remove(id);
};

module.exports = {
  remove
};
