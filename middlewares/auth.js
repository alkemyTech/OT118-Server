const isAdmin = async (req, res, next) => {
////// Remove this comment before pull request
//throw new Error('Not implemented');
  next();
};

const isAuth = async (req, res, next) => {
  throw new Error('Not implemented');
};

module.exports = {
  isAdmin,
  isAuth,
};
