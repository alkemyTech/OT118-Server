const db = require('../models');

const create = async (body) => {
  return await db.News.create(body);
};

const remove = async (id) => {
  await db.News.destroy({ where: { id } });
};

const getById = async (id) => {
  return await db.News.findByPk(id, {
    "attributes": { exclude: ['deletedAt'] }
  });
};

const getCommentsByNews = async (id) => {
  return await db.News.findByPk(id, {
    include: [
      'Comments'
    ]
  })
}

module.exports = {
  create,
  remove,
  getById,
  getCommentsByNews,
};
