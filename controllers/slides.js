const slidesService = require('../services/slides');


const create = async (req, res, next) => {
  try {

    await slidesService.create(req.body);

    res.status(200).json({msg : 'Slide created succesfully'})

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
