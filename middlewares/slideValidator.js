const {check, body, validationResult} = require("express-validator");


const validationText = check('text')
    .notEmpty()
    .withMessage('Texto requerido')


const validationOrg = check('organizationId')
    .notEmpty()
    .withMessage("Organizacion requerida")


const validationFields = [
    validationText,
    validationOrg,
    async (req, res, next) => {

        let validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()){
            console.log("validations not empty")
            res.status(400).json({
                errors : validationErrors.array()
            })

        }

        next()
    }
]

module.exports = {
    validationFields, 
}