const db = require('../models');


const create = async (body) => {
   return newContact =  await db.Contacts.create(body)
};


const getAll = async () => {
   const listContacts =  await db.Contacts.findAll()
   return listContacts
};

module.exports = {
  getAll,
  create
};