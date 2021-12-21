const db = require('../models');

const getAll = async () => {
   const listContacts =  await db.Contacts.findAll()
   return listContacts

};

module.exports = {
  getAll
};