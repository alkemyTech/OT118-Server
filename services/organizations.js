const organizationRepository = require('../repositories/organizations');

const update = async (id, body) => {
  return await organizationRepository.update(id, body);
};

module.exports = {
  update
};
