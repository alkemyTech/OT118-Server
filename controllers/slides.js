const slidesService = require('../services/slides');
const {validationResult} = require('express-validator')

const create = async (req, res, next) => {
  try {

    let validationErrors = validationResult(req);

    
    if(!validationErrors.isEmpty()){
      res.status(400).json({
        errors : validationErrors.mapped()
      })

    } else {
  
      await slidesService.create(req.body);

      res.status(200).json({msg : 'Slide created succesfully'})

    }

  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await slidesService.remove(req.params.id);
    res.status(200).json({ msg: `Slide ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,  
  remove
};
