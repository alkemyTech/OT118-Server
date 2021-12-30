const db = require('../models');

const create = async (body) => {
  return await db.Categories.create(body);
};

const getAll = async () => {
  const data = await db.Categories.findAll({
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
  await db.Categories.destroy({ where: { id } });
};

const getByName = async (name) => {
  return await db.Categories.findOne({ where: { name } });
};

module.exports = {
  getByName,
  create,
  getAll,
  getById,
  remove
};
