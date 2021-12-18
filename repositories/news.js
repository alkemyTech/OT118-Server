const db = require('../models');

const remove = async (id) => {
  await db.News.destroy({ where: { id } });
};
const getById = async (id) => {
  return await db.News.findByPk(id, {
    "attributes": { exclude: ['deletedAt'] }
  });
};

module.exports = {
  remove,
  getById
};
