const db = require("../models");

const getAll = async (limit, offset) => {
  return await db.Members.findAll({ limit, offset });
};

const count = async () => {
  return await db.Members.count();
};

const getById = async (id) => {
  return await db.Members.findByPk(id);
};

const create = async (member) => {
  return await db.Members.create(member);
};

const update = async (id, data) => {
  return await db.Members.update(data, { where: { id } });
};

const remove = async (id) => {
  return await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  getAll,
  getById,
  count,
  create,
  update,
  remove,
};
