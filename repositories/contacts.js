const db = require('../models');

const create = async (body) => {
   const newContact =  await db.Contacts.create(body)
   return newContact

};

module.exports = {
  create
};