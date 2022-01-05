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

const getAll = async (req, res, next) =>{
  try{
      const getData = await usersService.getAll();
      res.status(200).json({ getData });
      }catch(e){
        next(e);
      };



};

const getProfile = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const verifyToken = validateToken(token);
    const data = await usersService.getProfile(verifyToken.id);
    res.status(200).json({ data });
  } catch(error) {
    next(error)
  }
};

const update = async (req, res, next) => {
  
  try {
    const updateUser = await usersService.update(req.params.id, req.body);
    res.status(200).json({
      msg: `User with ID ${req.params.id} updated succesfully`,
      data: updateUser
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    register,
    login,
    getAll,
    getProfile,
    update
};
