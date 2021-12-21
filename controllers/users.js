const usersService = require("../services/users");

const login = async (req, res, next) => {
    try {
        const user = await usersService.login(req.body);
        if (user){
            res.status(200).json(user);
        } else {
            res.status(401).json({ok: false});
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    login
};
