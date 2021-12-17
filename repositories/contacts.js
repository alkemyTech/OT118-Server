const db = require('../models');

const create = async (data) => {
    await db.Contacts.create(data);
};

module.exports = {
  create
};