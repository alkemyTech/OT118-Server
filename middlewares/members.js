const { check } = require("express-validator");
const { checkValidationResults } = require("./validation");

const validator = [
  check("name", "name is required").not().isEmpty(),
  check("image", "image is required").not().isEmpty(),
  checkValidationResults,
];

module.exports = { validator };
