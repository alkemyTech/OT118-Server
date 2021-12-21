const {check, validationResult} = require("express-validator");

const nameValidationChain = check('name', 'name can not be empty')
    .exists().bail()
    .notEmpty().bail()
    .isString().withMessage("name must be a string");

const nameOk = [
    nameValidationChain,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()});
        }
        next();
    }
];

module.exports = {
    nameOk
};

