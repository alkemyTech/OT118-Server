const db = require('../models');

const update = async (id, body) => {
  const data = await db.Organization.update(body, {
    where: { id }
  });
  return data;
};

const getPublicInfo = async (id) => {
  return await db.Organization.findByPk(id, {
    attributes: ["name", "image", "phone", "address"]
  });
}

module.exports = {
  update,
  getPublicInfo
};
