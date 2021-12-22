
const auth = require('../modules/auth');
const usersServices = require("../services/users")

const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  throw new Error('Not implemented');
};


const inOwnUser = async (req, res, next) => {
  const idUser = req.params.id
  const token = req.headers["authorization"]
  if(!token){
    return res.status(401).json({ code: "Failed", message: " Access denied, you must load token "})
  }
  const userToken = auth.validateToken(token)
  const userTokenId = userToken.id
  if (userTokenId === idUser){
    return next()
  }
  const userBd = await usersServices.getById(userTokenId)
  if (!userBd){
    return res.status(401).json({ code: "Failed", message: " Access denied, user not found "})
  }

  const userBdRoleId = userBd.roleId

  if( userBdRoleId === 1){ 
    return next ()
  }

  else {
     return res.status(403).json({ code: "Failed", message: " Access denied !!!"})
  }
}

module.exports = {
  isAdmin,
  isAuth,
  inOwnUser
};
