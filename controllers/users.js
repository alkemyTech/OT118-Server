const usersService = require('../services/users');

const register = async (req, res, next) => {
  try {
    const data = await usersService.create(req.body);
    res.status(201).json({ msg: `User created succesfully`, access_token : data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
    try {
        const accessToken = await usersService.login(req.body);
        if (accessToken){
            res.status(200).json({access_token: accessToken});
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
