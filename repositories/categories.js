const db = require('../models');

// Create category
const create = async (body) => {
  return await db.Categories.create(body);
};

// Delete category
const remove = async (id) => {
  await db.Categories.destroy({ where: { id } });
};

module.exports = {
  create,
  remove
};
