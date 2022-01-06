const { check } = require("express-validator");
const { checkValidationResults } = require("./validation");

const emailValidationChain = check('email')
    .exists().bail()
    .notEmpty().bail()
    .isEmail().bail()
    .normalizeEmail();

const passwordValidationChain = check('password')
    .exists().bail()
    .notEmpty().bail();

const loginValidation = [
    emailValidationChain,
    passwordValidationChain,
    checkValidationResults
];

const registerValidation = [
    check('firstName', 'firstName is required').notEmpty(),
    check('lastName', 'lastName is required').notEmpty(),
    check('email', 'email is required').notEmpty(),
    check('email', 'email format is invalid').isEmail(),
    check('password', 'password is required').notEmpty(),
    check('password', 'password is not strong').isStrongPassword(),
    checkValidationResults,
]

module.exports = { loginValidation, registerValidation };