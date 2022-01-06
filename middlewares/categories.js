const {check} = require("express-validator");
const {checkValidationResults} = require("./validation");

const nameValidationChain = check('name', 'name can not be empty')
    .exists().bail()
    .notEmpty().bail()
    .isString().withMessage("name must be a string");

const nameOk = [
    nameValidationChain,
    checkValidationResults
];

module.exports = {
    nameOk
};

