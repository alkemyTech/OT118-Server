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

const getCommentsByNews = async (id) => {
  return await newsRepository.getCommentsByNews(id)
}

module.exports = {
  remove,
  create,
  getAll,
  getCommentsByNews,
};
