const usersService = require('../services/users');
const { validateToken } = require('../modules/auth')

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

<<<<<<< HEAD
=======

const remove = async (req, res, next) => {
  try{
    const response = await usersService.remove(req.params.id)
    return res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

>>>>>>> 14017526f0cc4c6801c00e2a61aed511c31b78f0
const getProfile = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const verifyToken = validateToken(token);
    const data = await usersService.getProfile(verifyToken.id);
    res.status(200).json({ data });
  } catch(error) {
    next(error)
  }
}

module.exports = {
    register,
    login,
<<<<<<< HEAD
    getProfile
=======
    remove,
    getProfile,
>>>>>>> 14017526f0cc4c6801c00e2a61aed511c31b78f0
};
