
const db = require('../models');

const findByName = async (roleName) => {
  return await Models.Roles.findOne({
    where: { name: roleName },
    raw: true,
  });
};

module.exports = {
  findByName,
};