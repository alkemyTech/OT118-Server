const db = require('../models');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

const create = async (body) => {
  return await db.Comments.create(body)
}

const update = async(body, id) => {
  return await db.Comments.update(body, {
    where: {id}
  })
}

const getAll = async () => {
  return await db.Comments.findAll()
}

const getById = async (id) => {
  return await db.Comments.findByPk(id)
}

module.exports = {
  remove,
  create,
  getAll,
  update,
  getById
};
