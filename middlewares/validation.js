const {validationResult} = require("express-validator");
const createError = require("http-errors");


exports.checkValidationResults = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const newError = createError(400, {msg: 'Input validation error', errors: errors.array()})
        next(newError);
    } else {
        next();
    }
}