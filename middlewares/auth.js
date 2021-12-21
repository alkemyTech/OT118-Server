const jwt = require('jsonwebtoken')
const usersRepository = require('../repositories/users')

const isAdmin = async (req, res, next) => {
 
const token = req.headers["token"];

  try {
    const verifyToken = jwt.verify(token,"secretWord");
    const user = await usersRepository.getById(verifyToken.id);

    if(!user){
      return res.status(404).json({
        data : {
          msg : "User not found"
        }
      })
    } else if(user.roleId != 1){
      return res.status(403).json({
        data : {
          msg : 'Access denied'
        }
      })

    }

    next()



  } catch (error) {

    if(!error.expiredAt) {
      return res.status(401).json({
        data : {
          msg : "invalid token"
        }
      })
    }

    res.status(400).json({
      data : {
        msg : 'expired token'
      }
    })
    
  }
};

const isAuth = async (req, res, next) => {
  throw new Error('Not implemented');
};

module.exports = {
  isAdmin,
  isAuth,
};
