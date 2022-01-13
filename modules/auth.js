const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { secret, expires, rounds } = require('../config/config');

const privateKey = secret;
const authExpiration = expires;

exports.generateToken = (info) => {
    console.log("PASE POR ACA ")
    return jwt.sign(info, privateKey, {
        expiresIn: authExpiration
    });
};

exports.validateToken = (token) => {
    try {
        var filteredToken = token.split(" ")[1];
        return jwt.verify(filteredToken, privateKey, {
            expiresIn: authExpiration
        });
    } catch(error) {
        return false;
    }
};