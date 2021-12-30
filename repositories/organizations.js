const db = require('../models');

const getById = async (id) => {
  return await db.Organization.findByPk(id);
};

const update = async (id, body) => {
  const data = await db.Organization.update(body, {
    where: { id },
  });
  return data;
};

module.exports = {
  getById,
  update,
};
