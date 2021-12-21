const slidesService = require('../services/slides');



const create = async (req, res, next) => {
  try {

    const data = await slidesService.create(req.body);

    res.status(200).json({
      msg : 'Slide created succesfully',
      data : data
    })


const getAll = async (req, res, next) => {
  try {
    const data = await slidesService.getAll()
    return res.status(200).json({ data : data})
    

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
  getAll,
  remove
};
