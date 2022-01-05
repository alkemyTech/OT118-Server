const { check } = require("express-validator");
const { checkValidationResults } = require("./validation");

const validator = [
  check("page", "Parameter 'page' must be an integer greater than zero").optional().isInt({ min: 1 }),
  checkValidationResults,
];

module.exports = { validator };
