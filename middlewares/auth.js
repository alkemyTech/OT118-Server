
const usersRepository = require('../repositories/users')
const { validateToken } = require('../modules/auth')
const auth = require('../modules/auth');
const usersServices = require("../services/users")
const rolesRepository = require("../repositories/roles");


const isAdmin = async (req, res, next) => {
 
  const token = req.headers["authorization"];

  const verifyToken = validateToken(token);

  if(verifyToken){
    console.log(verifyToken)
    const user = await usersRepository.getById(verifyToken.id);

    if(!user){
      return res.status(404).json({
        data : {
          msg : "User not found"
        }
      })
    } else if(user.roleId != 1){
      return res.status(403).json({
        
        msg : 'Access denied'
        
      })

    }

    next()

  } else {
    res.status(400).json({
      
      msg : 'expired or invalid token'
      
    })

  }
}

const isAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  try{
    const verifyToken = validateToken(token);
    const user = await usersRepository.getById(verifyToken.id)

    if (!user) {
      res.status(404).json({
        data: {
          msg: "User not found"
        }
      })
    }
    next()
  } catch(error){
    if(!error.expiredAt){
      res.status(401).json({
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
  const rolAdmin = rolesRepository.findByName("Admin")
  const rolAdminId = rolAdmin.id

  if( userBdRoleId === rolAdminId){
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
