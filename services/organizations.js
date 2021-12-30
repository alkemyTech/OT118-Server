const organizationRepository = require('../repositories/organizations');

const update = async (id, body) => {
  return await organizationRepository.update(id, body);
};

const getPublicInfo = async (id) => {
  return await organizationRepository.getPublicInfo(id)
}

module.exports = {
  update,
  getPublicInfo
};
