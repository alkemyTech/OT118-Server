const {check} = require("express-validator");
const {checkValidationResults} = require("./validation");

const validationText = check('text', 'text is required.')
    .notEmpty();

const validationOrg = check('organizationId', "organizationId is required.")
    .notEmpty();

const validationFields = [
    validationText,
    validationOrg,
    checkValidationResults
]

module.exports = {
    validationFields, 
}