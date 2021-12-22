const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    const error = new Error('No Token provied');
    error.status = 401;
    throw error
  }
  const decodedToken = jwtService.verify(token);
  if(!decodedToken){
    const error = new Error('Please enter a valid token provied at login')
    error.status = 403;
    throw error;
  }
  return decodedToken.id
};


module.exports = {
  isAdmin,
  isAuth,

};
