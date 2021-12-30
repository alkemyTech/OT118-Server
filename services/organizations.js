const organizationRepository = require('../repositories/organizations');

const getById = async (id) => {
  const organization = await organizationRepository.getById(id);
  if (!organization) {
    const error = new Error(`No existe la organización`);
    error.status = 404;
    throw error;
  }
  return organization;
};

const update = async (id, body) => {
  return await organizationRepository.update(id, body);
};

const getPublicInfo = async (id) => {
  return await organizationRepository.getPublicInfo(id)
}

module.exports = {
  getById,
  update,
  getPublicInfo,
};
