const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  try {
    const token = !req.headers['authorization'];
    const decodedToken = jwtService.verify(token);
    if (!decodedToken) {
      const error = {
        status: 403,
        msg: "Invalid Token"
      }
      throw error
    }
    next()
  } catch (error) {
    const error = {
      status: 403,
      msg: "Invalid or expire Token"
    }
    next(error)
  }
};


module.exports = {
  isAdmin,
  isAuth,
  
};
