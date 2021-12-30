const { check, validationResult } = require('express-validator');

const isValid = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: 'Body params invalid.',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = [
  check('firstName', 'firstName is required').notEmpty(),
  check('lastName', 'lastName is required').notEmpty(),
  check('email', 'email is required').notEmpty(),
  check('email', 'email format is invalid').isEmail(),
  check('password', 'password is required').notEmpty(),
  check('password', 'password is not strong').isStrongPassword(),
  isValid,
];
