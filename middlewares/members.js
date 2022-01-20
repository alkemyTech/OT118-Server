const { check } = require("express-validator");
const { checkValidationResults } = require("./validation");

const nameValidationChain = check('name', 'name is required')
    .exists().bail()
    .notEmpty().bail()

const imageValidationChain = check('image','image is required')
    .exists().bail()
    .notEmpty().bail()


const inputValidation = [
  nameValidationChain,
  imageValidationChain,
  checkValidationResults,
];

module.exports = { inputValidation };
