const { check, validationResult } = require('express-validator');

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
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

module.exports = {
    validationFields,
}