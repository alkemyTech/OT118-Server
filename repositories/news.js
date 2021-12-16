const db = require('../models');

const remove = async (id) => {
  await db.News.destroy({ where: { id } });
};

module.exports = {
  remove
};
