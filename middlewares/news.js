// Validation Middleware
const { check, validationResult } = require('express-validator');

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

const categoryIdValidationChain =  check('categoryId', 'categoryId must not be empty')
    .exists().bail()
    .notEmpty().bail()
    .isNumeric({no_symbols: true}).withMessage("categoryId must be a valid integer value");


const inputValidation = [
    nameValidationChain,
    contentValidationChain,
    imageValidationChain,
    categoryIdValidationChain,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: 'Body params invalid.',
                errors: errors.array() }
            );
        }
        next();
    }
];

module.exports = {
    inputValidation
};