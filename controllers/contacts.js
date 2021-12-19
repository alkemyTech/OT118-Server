const contactsService = require('../services/contacts');
const { validationResult} = require("express-validator")

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
  create
};
