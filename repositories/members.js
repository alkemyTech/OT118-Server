const db = require("../models");

const getAll = async () => {
  return await db.Members.findAll();
};

const remove = async (id) => {
  await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  getAll,
  remove,
};
