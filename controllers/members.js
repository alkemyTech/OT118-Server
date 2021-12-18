const membersService = require("../services/members");

const getAll = async (req, res, next) => {
  try {
    const data = await membersService.getAll();
    if (data) {
      res.status(200).json(data);
    }
    res.status(204).send();
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
  remove,
};
