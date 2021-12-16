const db = require('../models');

const remove = async (id) => {
  await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  remove
};
