const { check } = require('express-validator');
const { checkValidationResults } = require("./validation");

const validationNewUserId = check('novelty_id', 'News must be not empty')
    .notEmpty()
    .isInt()
    .withMessage('News must be exists')

const validationUser = check('user_id', 'User must be not empty')
    .notEmpty()
    .isInt()
    .withMessage('User id must be exists')

const validationBody = check('body', 'Body must be not empty')
    .notEmpty()
    .isString()

const validationFields = [
    validationNewUserId,
    validationUser,
    validationBody,
    checkValidationResults,
]

module.exports = {
    validationFields
}