const db = require('../models');

const create = async (data) => {
    return await db.Activities.create(data);
};

const getAll = async () => {
    return await db.Activities.findAll();
  }

const getById = async (id) => {
  return await db.Activities.findByPk(id, {
    "attributes": { exclude: ['deletedAt'] }
  });
}

const update = async (id, body) => {
  return await db.Activities.update(body, { where: { id }});
}


module.exports = {
  getAll,
  create,
  getById,
  update
}
