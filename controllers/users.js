const usersService = require('../services/users');

const register = async (req, res, next) => {
  try {
    const data = await usersService.create(req.body);
    res.status(201).json({ msg: `User created succesfully`, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register
};
