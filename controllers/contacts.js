const contactsService = require('../services/contacts');

const getAll = async (req, res, next) =>{
    try{
      const listContacts = await contactsService.getAll();
      return res.status(200).json({
         listContacts : listContacts
        })
      }  catch (error){
         next(error);
     }

}

module.exports = {
  getAll
};