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
  check('name', 'name is required').not().isEmpty(),
  check('image', 'image is required').not().isEmpty(),
  isValid,
];
