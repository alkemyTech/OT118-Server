const categoriesService = require('../services/categories');

// Create category
const create = async (req, res, next) => {
  try {
    const category = await categoriesService.create(req.body);
    res.status(200).json({msg: 'Category created succesfully', category});
  } catch (error) {
    next(error);
  }
};

// Delete category
const remove = async (req, res, next) => {
  try {
    await categoriesService.remove(req.params.id);
    res.status(200).json({ msg: `Category ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  remove
};
