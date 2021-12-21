const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { secret, expires, rounds } = require('../config/config');

const privateKey = secret;
const authExpiration = expires;

exports.generateToken = (info) => {
    return jwt.sign(info, privateKey);
};

exports.validateToken = (token) => {
    try {
        return jwt.verify(token, privateKey, {
            expiresIn: authExpiration
        });
    } catch(error) {
        return false;
    }
};