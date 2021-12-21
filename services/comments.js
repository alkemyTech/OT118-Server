const commentsRepository = require('../repositories/comments');

const remove = async (id) => {
  await commentsRepository.remove(id);
};
const getAll = async() =>{
  return await commentsRepository.getAll()
}

const create = async (body) => {
  return await commentsRepository.create(body)
}

module.exports = {
  remove,
  create,
  getAll
};
