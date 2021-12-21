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

const remove = async (id) => {
  await db.Categories.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  remove
};
