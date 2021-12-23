const db = require("../models");

const getAll = async () => {
  return await db.Members.findAll();
};

const create = async (member) => {
  return await db.Members.create(member);
};

const remove = async (id) => {
  await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  getAll,
  create,
  remove,
};
