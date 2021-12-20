const db = require('../models');

// Create category
const create = async (body) => {
  const data = await db.Categories.create(body);

  return data;
};

// Delete category
const remove = async (id) => {
  await db.Categories.destroy({ where: {id:id} });
};

module.exports = {
  create,
  remove
};
