const db = require('../models');

const remove = async (id) => {
  await db.Comments.destroy({ where: { id } });
};

module.exports = {
  remove
};
