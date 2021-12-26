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

const update = async(body, id) => {
  const comment = await commentsRepository.getById(id)
  if(!comment){
    const error = new Error('Comment not found')
    error.status = 409
    throw error
  }
  await commentsRepository.update(body, id)
  return comment
}

module.exports = {
  remove,
  create,
  getAll,
  update,
};
