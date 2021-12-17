const {check} = require("express-validator");

const validateCreateContacts = [
  check("name")
    .notEmpty().withMessage("you must complete the name"),
  check("email")
    .notEmpty().withMessage("you must complete the email")
]

module.exports = validateCreateContacts



