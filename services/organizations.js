const createError = require("http-errors");
const organizationRepository = require('../repositories/organizations');

const getById = async (id) => {
  const organization = await organizationRepository.getById(id);
  if (!organization) throw createError(404, { msg: "Organization not found" })
  return organization;
};

const update = async (id, body) => {
  return await organizationRepository.update(id, body);
};

const getPublicInfo = async (id) => {
  const publicInfo = await organizationRepository.getPublicInfo(id);
  if (!publicInfo) throw createError(404, { msg: "Public information not found" });
  return publicInfo;
}

module.exports = {
  getById,
  update,
  getPublicInfo,
};
