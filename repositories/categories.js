const db = require('../models');

const remove = async (id) => {
  await db.Categories.destroy({ where: { id } });
};

module.exports = {
  remove
};
