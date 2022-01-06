const {check} = require("express-validator");
const {checkValidationResults} = require("./validation");


const validationText = check('text')
    .notEmpty()
    .withMessage('Texto requerido')


const validationOrg = check('organizationId')
    .notEmpty()
    .withMessage("Organizacion requerida")


const validationFields = [
    validationText,
    validationOrg,
    checkValidationResults

]

module.exports = {
    validationFields, 
}