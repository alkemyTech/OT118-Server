const usersService = require('../services/users');

const register = async (req, res, next) => {
  try {
    const data = await usersService.create(req.body);
    res.status(201).json({ msg: `User created succesfully`, data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
    try {
        const user = await usersService.login(req.body);
        if (user){
            res.status(200).json(user);
        } else {
            res.status(401).json({ok: false});
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    login
};
