const slidesRepository = require('../repositories/slides');

const remove = async (id) => {
  await slidesRepository.remove(id);
};

module.exports = {
  remove
};
