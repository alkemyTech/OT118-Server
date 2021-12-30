const categoriesService = require("../services/categories");

// Create category
const create = async (req, res, next) => {
  try {
    const data = await categoriesService.create(req.body);
    res.status(201).json({ msg: `Category ${data.name} created succesfully`, data });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await categoriesService.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoryId = await categoriesService.getById(id);
    res.status(200).json({data: categoryId});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await categoriesService.remove(req.params.id);
    res
      .status(200)
      .json({ msg: `Category ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
