const slidesService = require('../services/slides');


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
  getAll,
  remove
};
