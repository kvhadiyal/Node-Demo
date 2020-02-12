const {
    jwt,
} = global;
const utils = require('./utils');
const userService = require('../modules/v1/users/userService');
const auth = {};

auth.checkToken = (req, res, next) => {
    let token = (req.headers && req.headers['x-auth-token']);
    if (utils.empty(token)) {
        token = (req.body && req.body['x-auth-token']);
    }
    if (utils.empty(token)) {
        return res.status(400).json({
            message: req.t('NOT_AUTHORIZED')
        });
    }
    req.token = token;
    return next();
};

auth.isAuthenticatedUser = async (req, res, next) => {
    let token = (req.headers && req.headers['x-auth-token']);
    if (utils.empty(token)) {
        token = (req.body && req.body['x-auth-token']);
    }
    const userData = jwt.verify(token);
    if (utils.empty(userData.userId)) {
        return res.status(400).json({
            message: req.t('NOT_AUTHORIZED')
        });
    }
    const where = {
        _id: userData.userId,
    };
    userService.getUser(where).then((user) => {
        if (user) {
            req.authUser = user;
            return next();
        }
        return res.status(400).json({
            message: req.t('NOT_AUTHORIZED')
        });
    });
};

module.exports = auth;
