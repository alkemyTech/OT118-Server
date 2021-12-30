const membersService = require("../services/members");

const getAll = async (req, res, next) => {
  try {
    const data = await membersService.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await membersService.create(req.body);
    res
      .status(201)
      .json({ msg: `Member ${data.name} created succesfully`, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await membersService.update(req.params.id, req.body);
    res.status(200).json({
      msg: `Member ${req.params.id} is updated successfully`,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await membersService.remove(req.params.id);
    res
      .status(200)
      .json({ msg: `Member ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
