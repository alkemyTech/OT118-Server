

const contactsService = require("../services/contacts");
const { validationResult} = require("express-validator");

const getAll = async (req, res, next) => {
  try {
    const listContacts = await contactsService.getAll();
    return res.status(200).json({
      data: listContacts,
    });
  } catch (error) {
    next(error);
  }
};


const create = async (req, res, next) =>{
    try{
      const newContact = await contactsService.create(req.body);
      return res.status(200).json({
         newContact : newContact,
         message : "contact created successfully"
        })
      }  catch (error){
         next(error);
     }

}


module.exports = {
  getAll,
  create
};
