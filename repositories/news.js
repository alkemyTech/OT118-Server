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

const getAll = async (limit, offset) => {
  return await db.News.findAll({
    limit,
    offset,
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

const count = async() =>{
  return await db.News.count()
}



module.exports = {
  create,
  remove,
  update,
  getById,
  getAll,
  count
}