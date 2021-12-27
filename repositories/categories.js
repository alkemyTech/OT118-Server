const db = require('../models');

const create = async (body) => {
  return await db.Categories.create(body);
};

const update = async (id, body) => {
  return await db.Categories.update(body, { where: { id },});
}

const getAll = async () => {
  const data = await db.Categories.findAll({
    attributes: ['name'],
    });
  return data;
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
  update,
  getAll,
  remove
};
