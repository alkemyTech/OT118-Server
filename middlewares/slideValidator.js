const {check, body} = require("express-validator");

module.exports = [
    check('text')
    .notEmpty()
    .withMessage('Texto requerido'),

    check('organizationId')
    .notEmpty()
    .withMessage("Organizacion requerida")
]