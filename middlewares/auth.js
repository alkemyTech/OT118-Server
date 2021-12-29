const jwt = require('jsonwebtoken')
const usersRepository = require('../repositories/users')

const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  try{
    const verifyToken = jwtService.verify(token);
    const user = await usersRepository.getById(verifyToken.id)

    if (!user) {
      return res.status(404).json({
        data: {
          msg: "User not found"
        }
      })
    }
    next()
  } catch(error){
    if(!error.expiredAt){
      return res.status(401).json({
        data: {
          msh: "Invalid token"
        }
      })
    }
    res.status(400).json({
      data: {
        msg: "Expired Token"
      }
    })
  }
};

module.exports = {
  isAdmin,
  isAuth,
};
