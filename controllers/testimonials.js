const testimonialsService = require('../services/testimonials');

const remove = async (req, res, next) => {
  try {
    await testimonialsService.remove(req.params.id);
    res.status(200).json({ msg: `Testimonial ${req.params.id} removed succesfully` });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
