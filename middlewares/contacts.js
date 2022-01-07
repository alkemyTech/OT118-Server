const {check} = require("express-validator");
const {checkValidationResults} = require("./validation");


const validateCreateContacts = [
  check("name")
    .notEmpty().withMessage("you must complete the name"),
  check("email")
    .notEmpty().withMessage("you must complete the email"),
    checkValidationResults,
]

module.exports = validateCreateContacts



