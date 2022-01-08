const createError = require('http-errors');
const usersRepository = require('../repositories/users')
const {validateToken} = require('../modules/auth')
const usersServices = require('../services/users')
const rolesRepository = require('../repositories/roles');

const invalidTokenMsg = 'Unauthorized, expired or invalid token';
const accessDeniedMsg = 'Access Denied';

const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    const verifyToken = validateToken(token);

    if (!verifyToken) next(createError(401, invalidTokenMsg));
    else {
        const user = await usersRepository.getById(verifyToken.id);
        if (!user) next(createError(401, invalidTokenMsg));
        else if (user.roleId !== 1) next(createError(403, accessDeniedMsg))
        else next();
    }
}

const isAuth = async (req, res, next) => {
    const token = req.headers['authorization'];
    const verifyToken = validateToken(token);

    if (!verifyToken) next(createError(401, invalidTokenMsg));
    else {
        const user = await usersRepository.getById(verifyToken.id)
        if (!user) next(createError(401, invalidTokenMsg));
        else next();
    }
};


const inOwnUser = async (req, res, next) => {
    const idUser = req.params.id
    const token = req.headers['authorization']

    if (!token) next(createError(401, invalidTokenMsg));

    const userToken = validateToken(token)
    const userTokenId = userToken.id
    if (userTokenId == idUser) {
        return next()
    }
    const userBd = await usersServices.getById(userTokenId)
    if (!userBd) next(createError(401, invalidTokenMsg));

    const userBdRoleId = userBd.roleId
    const rolAdmin = rolesRepository.findByName('Admin')
    const rolAdminId = rolAdmin.id

    if (userBdRoleId == rolAdminId) {
        return next()
    } else {
        next(createError(403, accessDeniedMsg))
    }
}

module.exports = {
    isAdmin,
    isAuth,
    inOwnUser
};
