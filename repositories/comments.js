const db = require('../models');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

const create = async (body) => {
  return await db.Comments.create(body)
}

module.exports = {
  remove,
  create
};
