const { check, validationResult } = require("express-validator");
// const { checkValidationResults } = require("./validation");

const checkValidationResults = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Body params invalid.",
      errors: errors.array(),
    });
  }
  next();
};

const validator = [
  check("page", "Parameter 'page' must be an integer greater than zero").optional().isInt({ min: 1 }),
  checkValidationResults,
];

module.exports = { validator };
