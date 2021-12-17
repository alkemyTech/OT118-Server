const contactsService = require('../services/contacts');
const { validationResult} = require("express-validator")

const create = async (req, res, next) =>{

  const errors = validationResult(req)

  if(errors.isEmpty()){
    try {
      const data={
        name :req.body.name ,
        phone : req.body.phone,
        email : req.body.email,
        message : req.body.message,
        deleteAt : req.body.deleteAt
      }
      await contactsService.create(data);

      return res.status(200).json({
        data: data,
        message: "Contact created succesfully"
        })
         }
     catch (error){
      next(error)
    }
  }
  else{
    return res.status(422).json({ errors: errors.array()})

  }

}




module.exports = {
  create
};
