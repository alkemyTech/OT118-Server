const db = require('../models');

const create = async (body) => {
   return newContact =  await db.Contacts.create(body)
};

module.exports = {
  create
};