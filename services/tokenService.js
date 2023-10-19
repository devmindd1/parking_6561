const jwt = require('jsonwebtoken');
const {jwtAccessSecret, jwtRefreshSecret} = require('../config/defaults');

exports.generateTokens = function(payload){
    return {
        accessToken: jwt.sign(payload, jwtAccessSecret, {expiresIn: '15d'}),
        refreshToken: jwt.sign(payload, jwtRefreshSecret, {expiresIn: '30d'})
    }
};

exports.validateAccessToken = function(_token){
    try {
        return jwt.verify(_token, jwtAccessSecret);
    }catch (e) {
        return null;
    }
};

exports.validateRefreshToken = function(_token){
    try {
        return jwt.verify(_token, jwtRefreshSecret);
    }catch (e) {
        return null;
    }
};