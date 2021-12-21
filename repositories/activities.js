const db = require('../models');

const create = async (data) => {
    return await db.Activities.create(data);
};

const getAll = async () => {
    return await db.Activities.findAll();
  }

module.exports = {
    getAll,
  create
}
