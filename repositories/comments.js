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

module.exports = {
  remove,
  create,
  getAll
};
