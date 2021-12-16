const membersService = require('../services/members');

const remove = async (req, res, next) => {
  try {
    await membersService.remove(req.params.id);
    res.status(200).json({ msg: `Member ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  remove
};
