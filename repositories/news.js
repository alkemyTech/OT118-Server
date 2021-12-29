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

const getAll = async () => {
  return await db.News.findAll({
    attributes: ['name', 'content', 'image'],
  });
}

const update = async (id, body) => {
  return await db.News.update(body, {
    where: {
      id
    },
  });
}

module.exports = {
  create,
  remove,
  update,
  getById,
  getAll
};
