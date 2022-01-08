const usersService = require("../services/users");
const { validateToken } = require("../modules/auth");
const paginationParams = require("../modules/paginationParams");

const register = async (req, res, next) => {
  try {
    const data = await usersService.create(req.body);
    res.status(201).json({
      msg: `User created succesfully`,
      access_token: data,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const accessToken = await usersService.login(req.body);
    if (accessToken) {
      res.status(200).json({ access_token: accessToken });
    } else {
      res.status(401).json({ ok: false });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try{
    const response = await usersService.remove(req.params.id)
    return res.status(200).json(response)
  } catch (e) {
    next(e)
  }
}

const getAll = async (req, res, next) => {
  try {
    const params = paginationParams.generate(req);
    const data = await usersService.getAll(params);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const verifyToken = validateToken(token);
    const data = await usersService.getProfile(verifyToken.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {

  try {
    const updateUser = await usersService.update(req.params.id, req.body);
    res.status(200).json({
      msg: `User updated succesfully`,
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
    remove,
    update,
    getProfile,
};
