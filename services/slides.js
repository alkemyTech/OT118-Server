const slidesRepository = require('../repositories/slides');



const getAll = async () => {
  await slidesRepository.getAll()
}


const remove = async (id) => {
  await slidesRepository.remove(id);
};

module.exports = {
  getAll,
  remove
};
