const { check } = require('express-validator');
const {checkValidationResults} = require("./validation");

const nameValidationChain = check('name', 'name must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 3, max: 255}).withMessage("name must be between 3 to 255 characters long");

const contentValidationChain = check('content','content must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 5}).withMessage("content must at least 5 characters long")

const imageValidationChain = check('image','image must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 3, max: 1234}).withMessage("image must be between 3 to 1234 characters long");

const inputValidation = [
    nameValidationChain,
    contentValidationChain,
    imageValidationChain,
    checkValidationResults
];

module.exports = {
    inputValidation
};