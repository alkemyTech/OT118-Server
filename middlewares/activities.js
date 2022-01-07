const { check } = require('express-validator');
const {checkValidationResults} = require("./validation");

const validationName = check('name', 'name must be not empty')
    .notEmpty()
    .isString()
    .isLength({min: 3, max: 255})
    .withMessage('Name must be exists')

const validationContent = check('content', 'content must be not empty')
    .notEmpty()
    .isString()
    .isLength({min: 3, max: 255})
    .withMessage('Content must be exists')

const validationFields = [
    validationName,
    validationContent,
    checkValidationResults,
]

module.exports = {
    validationFields,
}