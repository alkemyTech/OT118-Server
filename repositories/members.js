const db = require("../models");

const getAll = async () => {
  return await db.Members.findAll();
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
  await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
