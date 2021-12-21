
const auth = require('../module/auth'); //esto lo tiene que hacer Adrian en este archivo va a estar
                                        // el metodo para crear el token y el metodo para decodificar el mismo
const usersServices = require("../services/users")

const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  throw new Error('Not implemented');
};

// creo el middleware de propiedad
const inOwnershipUser = async (req, res, next) => {
  const idUser = req.params.id
  const token = req.headers["authorization"]
  if(!token){
    return res.status(401).json({ code: "Failed", message: " Access denied, you must load token "})
  }
  const userToken = auth.decodeToken(token) // el metodo decodeToken deberia ser creado por adrian, me devuelve un objeto que deberia tener el id del usuario
  const userTokenId = userToken.id

  if (userTokenId === idUser){       // si el id pasado por parametro es = al id del usuario en el token se autoriza y sigue la ruta
    return next()
  }
  // buscar el usuario en la base de datos
  const userBd = await usersServices.getById(userTokenId)
  if (!userBd){
    return res.status(401).json({ code: "Failed", message: " Access denied, user not found "})
  }
  // busco el id del rol de usuario
  const userBdRoleId = userBd.roleId
  if( userBdRoleId === 1){     // el roleId = 1 es el rol de administrador
    return next ()
  }
  // si no cumple ninguna de las consiciones lo saco
  else {
     return res.status(403).json({ code: "Failed", message: " Access denied !!!"})
  }
}

module.exports = {
  isAdmin,
  isAuth,
  inOwnershipUser
};
