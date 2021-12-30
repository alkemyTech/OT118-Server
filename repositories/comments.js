const db = require('../models');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

const create = async (body) => {
  return await db.Comments.create(body)
}

const getAll = async () => {
  return await db.Comments.findAll()
}

const getCommentsByNews = async (id) => {
  return await db.Comments.findAll({
    where:{
      novelty_id: id
    },
  })
}

module.exports = {
  remove,
  create,
  getAll,
  getCommentsByNews
};
