const db = require('../models');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

const getAll = async () => {
  return await db.Comments.findAll()
}

module.exports = {
  remove,
  getAll
};
