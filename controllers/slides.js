const slidesService = require('../services/slides');

const remove = async (req, res, next) => {
  try {
    await slidesService.remove(req.params.id);
    res.status(200).json({ msg: `Slide ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  remove
};
