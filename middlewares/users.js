const { check } = require("express-validator");
const { checkValidationResults } = require("./validation");

const firstNameValidationChain = check("firstName", "first name is required")
  .exists()
  .bail()
  .notEmpty()
  .bail();

const lastNameValidationChain = check("lastName", "last name is required")
  .exists()
  .bail()
  .notEmpty()
  .bail();

const emailValidationChain = check("email", "email format is required.")
  .exists()
  .bail()
  .notEmpty()
  .bail()
  .isEmail()
  .bail()
  .normalizeEmail();

const passwordValidationChain = check(
  "password",
  "password format is required."
)
  .exists()
  .bail()
  .notEmpty()
  .bail();

const registerValidation = [
  firstNameValidationChain,
  lastNameValidationChain,
  emailValidationChain,
  passwordValidationChain
    .isStrongPassword()
    .withMessage("password is not strong"),
  checkValidationResults,
];

const loginValidation = [
  emailValidationChain,
  passwordValidationChain,
  checkValidationResults,
];

module.exports = { loginValidation, registerValidation };
