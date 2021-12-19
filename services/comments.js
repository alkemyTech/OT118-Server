const commentsRepository = require('../repositories/comments');

const remove = async (id) => {
  await commentsRepository.remove(id);
};
const getAll = async() =>{
  await commentsRepository.getAll()
}

module.exports = {
  remove,
  getAll
};
