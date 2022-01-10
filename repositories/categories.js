const db = require('../models');

const create = async (body) => {
  return await db.Categories.create(body);
};

const count = async () => {
  return await db.Categories.count();
};

const update = async (id, body) => {
  return await db.Categories.update(body, { where: { id },});
}

const getAll = async (limit, offset) => {
  const data = await db.Categories.findAll({
    limit, offset,
    attributes: ['name'],
  });
  return data;
};

const getById = async (id) => {
  return await db.Categories.findByPk(id, {
    "attributes": { exclude: ['deletedAt'] }
  });
};

const remove = async (id) => {
  return await db.Categories.destroy({ where: { id: id } });
};

const getByName = async (name) => {
  return await db.Categories.findOne({ where: { name } });
};

module.exports = {
  getByName,
  create,
  update,
  count,
  getAll,
  getById,
  remove
};
