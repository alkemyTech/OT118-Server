const db = require("../models");

const getAll = async () => {
  return await db.Members.findAll();
};

const create = async (member) => {
  return await db.Members.create({
    name: member.name,
    image: member.image,
    facebookUrl: member.facebookUrl || null,
    instagramUrl: member.instagramUrl || null,
    linkedinUrl: member.linkedinUrl || null,
    description: member.description || null,
  });
};

const remove = async (id) => {
  await db.Members.destroy({ where: { id: id } });
};

module.exports = {
  getAll,
  create,
  remove,
};
