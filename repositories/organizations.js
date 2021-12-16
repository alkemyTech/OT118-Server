const db = require('../models');

const update = async (id, body) => {
  const data = await db.Organization.update(body, {
    where: { id }
  });
  return data;
};

module.exports = {
  update
};
