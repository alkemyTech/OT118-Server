const {check,validationResult } = require("express-validator");


const validateCreateContacts = [
  check("name")
    .notEmpty().withMessage("you must complete the name"),
  check("email")
    .notEmpty().withMessage("you must complete the email"),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ error: errors.array() });
      }
      next();
  }
]

module.exports = validateCreateContacts



