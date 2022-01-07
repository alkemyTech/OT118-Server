const commentsRepository = require('../repositories/comments');
const createError = require("http-errors");

const remove = async (id) => {
  await commentsRepository.remove(id);
};
const getAll = async() => {
  return await commentsRepository.getAll()
}

const create = async (body) => {
  return await commentsRepository.create(body)
}


const getCommentsByNews = async (id) => {
  return await commentsRepository.getCommentsByNews(id)
}

const update = async(body, id) => {
  const comment = await commentsRepository.getById(id)
  if(!comment) throw createError(404, { msg: "Comment not found" });

  const updatedComment = await commentsRepository.update(body, id);
  if (updatedComment[0] !== 1) throw createError(400, "Comment couldn't be updated");

  return await commentsRepository.getById(id);
}

module.exports = {
  remove,
  create,
  getAll,
  getCommentsByNews,
  update,
};
