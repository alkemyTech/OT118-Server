const { check } = require('express-validator');
const {checkValidationResults} = require("./validation");

const nameValidationChain = check('name', 'name must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 3, max: 255}).withMessage("name must be between 3 to 255 characters long");
const imageValidationChain = check('image','image must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 3, max: 1234}).withMessage("phone must be between 3 to 1234 characters long");
const phoneValidationChain = check('phone','phone must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 3, max: 1234}).withMessage("phone must be between 3 to 1234 characters long");
const addressValidationChain = check('address','address must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 5}).withMessage("address must at least 5 characters long")
const emailValidationChain = check('email','email must be not empty')
    .exists().bail()
    .notEmpty().bail()
    .isEmail().withMessage("email must be a valid email");
const welcomeTextValidationChain =  check('welcomeText', 'welcomeText must not be empty')
    .exists().bail()
    .notEmpty().bail()
    .isLength({min: 5}).withMessage("welcomeText must at least 5 characters long");
const contactUrlsValidationChain = [
    check('urlFacebook').isURL().withMessage("urlFacebook must be a valid url."),
    check('urlLinkedin').isURL().withMessage("urlLinkedin must be a valid url."),
    check('urlInstagram').isURL().withMessage("urlInstagram must be a valid url.")
];

const inputValidation = [
    nameValidationChain,
    imageValidationChain,
    phoneValidationChain,
    addressValidationChain,
    emailValidationChain,
    welcomeTextValidationChain,
    contactUrlsValidationChain,
    checkValidationResults
];

module.exports = {
    inputValidation
};