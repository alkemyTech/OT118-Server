const { check, validationResult } = require('express-validator');

const emailValidationChain = check('email')
    .exists().bail()
    .notEmpty().bail()
    .isEmail().bail()
    .normalizeEmail();
const passwordValidationChain = check('password')
    .exists().bail()
    .notEmpty().bail();


const isAdmin = async (req, res, next) => {
  throw new Error('Not implemented');
};

const isAuth = async (req, res, next) => {
  throw new Error('Not implemented');
};


const loginInputValidation = [
  emailValidationChain,
  passwordValidationChain,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];


module.exports = {
  isAdmin,
  isAuth,
  loginInputValidation,
};
