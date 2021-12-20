const {check, validationResult} = require("express-validator");

const nameOk = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array()});
            }
            next();
        }
]

module.exports = {
    nameOk
};

