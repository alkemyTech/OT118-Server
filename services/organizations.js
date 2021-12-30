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

module.exports = {
  getById,
  update
};
