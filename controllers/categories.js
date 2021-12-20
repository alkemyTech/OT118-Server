const categoriesService = require('../services/categories');

// Get all categoies
const getAll = async (req, res, next) => {
  try {
    const response = await categoriesService.getAll();
    res.status(200).json({ msg: `Categories succesfully listed`, response});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await categoriesService.remove(req.params.id);
    res.status(200).json({ msg: `Category ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  remove
};
